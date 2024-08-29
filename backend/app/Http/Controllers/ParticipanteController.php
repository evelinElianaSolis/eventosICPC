<?php

namespace App\Http\Controllers;
use App\Models\Equipo;
use App\Models\Evento;
use App\Models\Participante;
use App\Models\Persona;

use Illuminate\Http\Request;

class ParticipanteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    try{
        $existingParticipante = Participante::where('idPersona', $request->input('idPersona'))
        ->where('idEvento', $request->input('idEvento'))
        ->first();

    if ($existingParticipante) {
        // Si ya existe, devolver un mensaje de error
        return response()->json(['message' => 'La persona ya está registrada en ese equipo.'], 400);
    }

        $participante = new participante;
        $participante->idPersona = $request->input('idPersona');
        $participante->idEvento = $request->input('idEvento');
        $participante->idEquipo = $request->input('idEquipo');
        $participante->save();
        return response()->json(['message' => 'participante creado con éxito', 'participante' => $participante], 201);
   } catch (\Exception $e) {
        
        return response()->json(['message' => 'Error al crear el participante', 'error' => $e->getMessage()], 500);
    }
    }

    public function obtenerParticipantesYPersonasPorEquipo($idEquipo)
    {
        try {
            // Obtener participantes y personas asociadas al equipo
            $participantes = participante::where('idEquipo', $idEquipo)->get();
    
            // Inicializar array para almacenar resultados
            $listParticipantes = [];
    
            // Iterar sobre cada participante para obtener personas asociadas
            foreach ($participantes as $participante) {
                // Buscar la persona asociada al participante por su idPersona
                $persona = persona::where('idPersona', $participante->idPersona)->first();
    
                // Verificar si se encontró la persona
                if ($persona) {
                    // Agregar datos al array de resultados
                    $listParticipantes[] = [
                        'participante' => $participante,
                        'persona' => $persona,
                    ];
                }
            }
    
            // Retornar la respuesta
            return response()->json(['participantes' => $listParticipantes], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al obtener datos', 'error' => $e->getMessage()], 500);
        }
    }
    


    public function obtenerIdsParticipantesPorEvento($idEvento)
    {
        try {
            $idsParticipantes = Participante::where('idEvento', $idEvento)->pluck('idPersona')->toArray();
    
            return response()->json(['participantes' => $idsParticipantes], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener los IDs de participantes', 'error' => $e->getMessage()], 500);
        }
    }
    

    public function obtenerParticipantesPorEquipo($idEquipo)
{
    try {
        $participantes = participante::where('idEquipo', $idEquipo)->get();
        
        if ($participantes->isEmpty()) {
            return response()->json(['participantes' => $participantes], 404);
        }

        return response()->json(['participantes' => $participantes], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al recuperar participantes', 'error' => $e->getMessage()], 500);
    }
}

public function encontrarIdParticipantesPorEquipos(Request $request)
{
    try {
        $idsEquipos = $request->input('equipos');
        
        $idParticipantes = participante::whereIn('idEquipo', $idsEquipos)->pluck('idPersona');

        return response()->json(['participantes' => $idParticipantes], 200);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al obtener los IDs de los entrenadores',
            'detalle' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function show($id)
     {
         $participante = participante::findOrFail($id);
         return response()->json([ 'participante' => $participante], 201);
     }
 

     
 /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function update(Request $request, $id)
     {
         $request->validate([
             'idEquipo' => 'sometimes',
             'idEvento' => 'required',
         ]);
 
         $participante = participante::findOrFail($id);
         $participante->update([
            
             'idEquipo' => $request->input('idEquipo'),
             'idEvento' => $request->input('idEvento'),
         ]);
 
         return response()->json($participante, 200); }
 
           /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
     public function destroy($id)
     {
         $participante = participante::findOrFail($id);
         $participante->delete();
 
         return response()->json(['message' => 'Participante eliminado exitosamente'], 200);
        }
   

         public function eliminarParticipanteYPersona($idEquipo, $idPersona)
         {
             try {
                 $participante = participante::where('idPersona', $idPersona)
                     ->where('idEquipo', $idEquipo)
                     ->first();
         
                 if ($participante) {
                     $persona = persona::where('idPersona', $idPersona)->first();

                     if ($persona) {

                         if ($persona) {
                            $persona->delete();
                            $participante->delete();
                           
                           
                            return response()->json(['message' => 'Participante , correo y persona eliminados con éxito'], 200);

                         }else{
                            return response()->json(['message' => 'Participante , correo y persona no eliminados con éxito'], 200);

                         }
                     }else{
                        return response()->json(['message' => 'Participante  y persona no eliminados con éxito'], 200);

                     }
                 } else {
                     return response()->json(['message' => 'Participante no encontrado', 'par'=>$participante], 404);
                 }
             } catch (\Exception $e) {
                 return response()->json(['message' => 'Error al eliminar participante y persona', 'error' => $e->getMessage()], 500);
             }
         }
         
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

       


    public function getParticipantsInfoByEventId($idEvento)
    {
        try {
            $participants = participante::where('idEvento', $idEvento)->get();
    
            $participantsInfo = [];
    
            foreach ($participants as $participant) {
                $persona = persona::find($participant->idPersona);
    
                if ($persona) {
                   
                        $participantsInfo[] = [
                            'nombrePersona' => $persona->nombrePersona,
                            'correo' =>  $persona->correo,
                        ];
                    
                }
            }
            return response()->json(['nombreCorreo' => $participantsInfo], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving participants information', 'error' => $e->getMessage()], 500);
        }
    }
    


 
}