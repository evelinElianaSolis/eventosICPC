<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Correo;
class CorreoController extends Controller
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
    // app/Http/Controllers/UsuarioController.php

   
       
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $correo = new correo;
            $correo->correoC=$request->input('correoC');
            $correo->estadoNotificacion=$request->input('estadoNotificacion');    
            $correo->idPersona=$request->input('idPersona');
        
           // if($request->has('idPersona')){
           //     $correo->idPersona=$request->input('idPersona');
           // }
            // Guardar el correo en la base de datos
            $correo->save();
        
            // Respuesta de éxito
            return response()->json(['message' => 'Correo creado con éxito'], 201); 
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al crear correo', 'error' => $e->getMessage()], 500);
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

