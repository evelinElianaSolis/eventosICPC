<?php

namespace App\Http\Controllers;
use App\Models\Equipo;
use App\Models\Evento;
use App\Models\Participante;
use App\Models\Persona;
use App\Models\Correo;

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
        $participante = new participante;
        $participante->idParticipante = $request->input('idParticipante');
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
                $persona = persona::where('idPersona', $participante->idParticipante)->first();
    
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
   

         public function eliminarParticipanteYPersona($idEquipo, $idParticipante)
         {
             try {
                 // Buscar el participante por idEquipo e idParticipante
                 $participante = participante::where('idParticipante', $idParticipante)
                     ->where('idEquipo', $idEquipo)
                     ->first();
         
                 if ($participante) {
                     $persona = persona::where('idPersona', $idParticipante)->first();

                     if ($persona) {
                         $correo = correo::where('idPersona', $idParticipante)->first();

                         if ($persona) {
                            $correo->delete();
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

       

 
}