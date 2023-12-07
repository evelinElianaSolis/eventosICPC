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
            $persona = new persona;
            $persona->idPersona = $request->input('idPersona');
            $persona->nombrePersona = $request->input('nombrePersona');
            $persona->apellidoPersona = $request->input('apellidoPersona');
            $persona->genero = $request->input('genero');
            $persona->telefonoPersona = $request->input('telefonoPersona');
          //  $persona->correoPersona = $request->input('correoPersona');
            $persona->save();

            // Retorna la respuesta con el objeto persona guardado
            return response()->json(['message' => 'Participante regidtrado con éxito','data' => $persona], 201);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al registrar psrticipante', 'error' => $e->getMessage()], 500);
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
