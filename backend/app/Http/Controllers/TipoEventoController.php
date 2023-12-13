<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoEvento;
class TipoEventoController extends Controller
{
    /**
     * Obtener todos los tipos de evento desde la base de datos.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoEvento = tipoEvento::all();
        return response()->json($tipoEvento);
    }

    /**
     * Almacenar un nuevo tipo de evento en la base de datos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    try {
        $tipoEvento = new tipoEvento();
        $tipoEvento->idTipoEvento = $request->input('idTipoEvento');
        $tipoEvento->nombreTipoEvento = $request->input('nombreTipoEvento');
        $tipoEvento->descripcionTipoEvento = $request->input('descripcionTipoEvento');
        $tipoEvento->save();
        
        return response()->json($tipoEvento, 201);
    } catch (\Exception $e) {
        // Manejar errores
        return response()->json(['message' => 'Error al crear tipo de evento', 'error' => $e->getMessage()], 500);
    }
}


    /**
     * Obtener un tipo de evento específico por su ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Actualizar un tipo de evento específico por su ID.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Eliminar un tipo de evento específico por su ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }


    public function obtenerTipoEventoPorId($idTipoEvento)
    {
        try {
            $tipoEvento = TipoEvento::find($idTipoEvento);
    
            if (!$tipoEvento) {
                return response()->json(['message' => 'No se encontró el tipo de evento'], 404);
            }
    
            return response()->json(['message' => 'Tipo de evento recuperado con éxito', 'tipoEvento' => $tipoEvento], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al recuperar el tipo de evento', 'error' => $e->getMessage()], 500);
        }
    }


}
