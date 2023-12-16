<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Entrenador;
class EntrenadorController extends Controller
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
            $existingEntrenador = entrenador::where('idPersona', $request->input('idPersona'))
            ->where('idEquipo', $request->input('idEquipo'))
            ->first();

        if ($existingEntrenador) {
            // Si ya existe, devolver un mensaje de error
            return response()->json(['message' => 'La persona ya está registrada en ese equipo.'], 400);
        }
            $entrenador = new entrenador;
            $entrenador->   idPersona = $request->input('idPersona');
            $entrenador->   idEquipo = $request->input('idEquipo');
              //  'passwordEntrenador' => $request->input('idEvento'),
              $entrenador->save();  
            
            return response()->json(['message' => 'entrenador creado con éxito'], 201);
       } catch (\Exception $e) {
            
            return response()->json(['message' => 'Error al crear el entrenador', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function encontrarIdEntrenadoresPorEquipos(Request $request)
    {
        try {
            $idsEquipos = $request->input('equipos');
            
            $ciEntrenadores = Entrenador::whereIn('idEquipo', $idsEquipos)->pluck('idPersona');
    
            return response()->json(['entrenadores' => $ciEntrenadores], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener los IDs de los entrenadores',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }
    

        public function obtenerEntrenadoresPorEquipo($idEquipo)
        {
            try {
                $entrenadores = entrenador::where('idEquipo', $idEquipo)->get();
                
                if ($entrenadores->isEmpty()) {
                    return response()->json(['entrenadores' => $entrenadores], 404);
                }
        
                return response()->json(['entrenadores' => $entrenadores], 200);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Error al recuperar entrenadores', 'error' => $e->getMessage()], 500);
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
    public function destroy($idPersona)
{
    try {
        $entrenador = Entrenador::find($idPersona);
        $entrenador->delete();

        return response()->json(['message' => 'Entrenador eliminado con éxito'], 200);
    } catch (\Exception $e) {
        // Manejar errores
        return response()->json(['message' => 'Error al eliminar el entrenador', 'error' => $e->getMessage()], 500);
    }
}

}
