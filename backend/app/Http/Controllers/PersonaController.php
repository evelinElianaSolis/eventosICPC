<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Persona;
class PersonaController extends Controller
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
        try {

            $existingPersona = persona::where('idPersona', $request->input('idPersona'))
         //   ->where('correo', $request->input('correo'))
            ->first();

        if ($existingPersona) {
            // Si ya existe, devolver un mensaje de error
            return response()->json(['message' => 'La persona ya está registrada.'], 400);
        }
            $persona = new persona;
            $persona->idPersona = $request->input('idPersona');
            $persona->nombrePersona = $request->input('nombrePersona');
            $persona->apellidoPersona = $request->input('apellidoPersona');
            $persona->genero = $request->input('genero');
            $persona->pais = $request->input('pais');
            $persona->correo = $request->input('correo');
          //  $persona->correoPersona = $request->input('correoPersona');
            $persona->save();

            // Retorna la respuesta con el objeto persona guardado
            return response()->json(['message' => 'Participante regidtrado con éxito','data' => $persona], 201);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al registrar psrticipante', 'error' => $e->getMessage()], 500);
        }
    }
    public function obtenerCorreosPorIds(Request $request)
    {
        try {
            $idsPersonas = $request->input('idPersona');
    
            // Obtener correos de las personas cuyos IDs estén en el array
            $correos = persona::whereIn('idPersona', $idsPersonas)->pluck('correo');
    
            return response()->json(['correos' => $correos], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener correos',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }
    


    //---------------------------------------------------------------------------------
    public function buscarPorId($pais, $idPersona)
{
    try {
        $persona = persona::where('idPersona', $idPersona)
        ->where('pais', $pais)
        ->first();

        return response()->json(['message' => 'Persona encontrada', 'persona' => $persona], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al buscar persona', 'error' => $e->getMessage()], 500);
    }
}

public function buscarPorIdTF($pais, $idPersona)
{
    try {
        $persona = Persona::where('idPersona', $idPersona)
            ->where('pais', $pais)
            ->first();

        if ($persona) {
            return response()->json(['message' => 'Persona encontrada', 'found' => true], 200);
        } else {
            return response()->json(['message' => 'Persona no encontrada', 'found' => false], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al buscar persona', 'error' => $e->getMessage()], 500);
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
        //
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
