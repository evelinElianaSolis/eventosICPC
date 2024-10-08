<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Equipo;
use App\Models\Evento;
class EquipoController extends Controller
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
          /*  $existingEquipo = equipo::where('idEvento', $request->input('idEvento'))
            ->where('nombreEquipo', $request->input('nombreEquipo'))
            ->first();

        if ($existingEquipo) {
            return response()->json(['message' => 'En equipo ya está registrado en este evento.'], 400);
        }*/
            $equipo = new Equipo;
            $equipo->idEquipo = $request -> input('idEquipo');
            $equipo->nombreEquipo = $request->input('nombreEquipo');
            $equipo->descripcionEquipo = $request->input('descripcionEquipo');
            $equipo->idEvento = $request->input('idEvento');
            $equipo->save();
    
            // Obtener el último idEquipo
            $ultimoIdEquipo = $equipo->getKey();
    
            return response()->json(['message' => 'Equipo creado con éxito', 'idEquipo' => $ultimoIdEquipo], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el Equipo', 'error' => $e->getMessage()], 500);
        }
    }
    public function checkEquipoExists(Request $request)
    {
        try {
            $nombreEquipo = $request->input('nombreEquipo');
            $idEvento = $request->input('idEvento');
            $idEquipo = $request->input('idEquipo');
    
            $equipoExistente = equipo::where('nombreEquipo', $nombreEquipo)
                ->where('idEvento', $idEvento)
                ->where('idEquipo', '!=', $idEquipo)
                ->exists();
    
            return response()->json(['exists' => $equipoExistente], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al verificar el equipo', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function buscarEquipo($idEquipo){
        try {
            $equipo = equipo::where('idEquipo', $idEquipo)->first();
            if (!$equipo) {
                return response()->json(['message' => 'Equipo no encontrado'], 404);
            }
                return response()->json(['idEquipo' => $equipo->idEquipo, 'equipo' => $equipo], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al recuperar equipo', 'error' => $e->getMessage()], 500);
        }}


        public function obtenerUltimoIdEquipo()
{
    try {
        $ultimoId = equipo::orderBy('idEquipo', 'desc')->value('idEquipo');

        

        return response()->json(['idEquipo' => $ultimoId], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al obtener el último ID de equipo', 'error' => $e->getMessage()], 500);
    }
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function equiposPorEvento($idEvento)
    {
       // $equipos = equipo::where('idEvento', $idEvento)->get();
      // $evento = evento::findOrFail($idEvento); 
       $equipos = equipo::where('idEvento', $idEvento)->get();
       // Puedes retornar los datos en formato JSON o como necesites
       return response()->json(['equipos' => $equipos], 200); 
    }

    public function idEquiposPorEvento($idEvento)
{
    try {
        $equipos = Equipo::where('idEvento', $idEvento)->pluck('idEquipo');
        
        return response()->json(['equipos' => $equipos], 200);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al obtener la lista de equipos',
            'detalle' => $e->getMessage()
        ], 500);
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

    public function actualizar(Request $request, $idEquipo)
{
    try {
        // Buscar el equipo que se va a actualizar
        $equipo = equipo::find($idEquipo);

        if (!$equipo) {
            return response()->json(['message' => 'Equipo no encontrado'], 404);
        }

        $equipo->nombreEquipo = $request->input('nombreEquipo');
        $equipo->descripcionEquipo = $request->input('descripcionEquipo');
        $equipo->idEvento = $request->input('idEvento');
        $equipo->save();

        return response()->json(['message' => 'Equipo actualizado con éxito', 'equipo' => $equipo], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al actualizar el Equipo', 'error' => $e->getMessage()], 500);
    }
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idEquipo)
{
    try {
        $equipo = equipo::find($idEquipo);
        $equipo->delete();
        return response()->json(['message' => 'Equipo eliminado con éxito'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al eliminar el equipo', 'error' => $e->getMessage()], 500);
    }
}

}
