<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Actividad;
class ActividadController extends Controller
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
            $actividad = actividad::create([
            'nombreActividad' => $request->input('nombreActividad'),
            'descripcionActividad' => $request->input('descripcionActividad'),
            'modalidad' =>$request->input('modalidad'),
            'fechaInicioActividad' => $request->input('fechaInicioActividad'),
            'fechaFinActividad' => $request->input('fechaFinActividad'),
            'horaInicioActividad' => $request->input('horaInicioActividad'),
            'ubicacionActividad' => $request->input('ubicacionActividad'),
            'idEvento' => $request->input('idEvento'),
        ]);
    } catch (\Exception $e) {
        
        return response()->json(['message' => 'Error al crear el actividad', 'error' => $e->getMessage()], 500);
    }
    }

    public function buscarActividadPorNombre($idEvento,$nombreActividad)
    {
        $actividad = actividad::where('idEvento', $idEvento )
        ->where('nombreActividad' , $nombreActividad)->get();

        if ($actividad->isEmpty()) {
            return response()->json(['message' => 'No se encontrado el activdad para este evento con ID ' . $idEvento], 404);
        }
        return response()->json(['actividadPorNombre' => $actividad], 200);
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


    public function obtenerActividadPorId($idEvento)
    {
        try {
            $actividad = Actividad::where('idEvento', $idEvento)->first();
    
            if (!$actividad) {
                return response()->json(['message' => 'No se encontró la actividad para el evento especificado'], 404);
            }
    
            return response()->json(['message' => 'Actividad recuperada con éxito', 'actividad' => $actividad], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al recuperar la actividad', 'error' => $e->getMessage()], 500);
        }
    }









}
