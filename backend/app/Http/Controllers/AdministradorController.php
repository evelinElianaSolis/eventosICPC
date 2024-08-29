<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\administrador;

class AdministradorController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {  
        $administrador = new administrador();
        $administrador->idAdministrador = $request->input('idAdministrador');
        $administrador->nombreAdministrador = $request->input('nombreAdministrador');
        $administrador->passwordAdministrador = $request->input('passwordAdministrador');
        $administrador->correoAdministrador = $request->input('correoAdministrador');
        $administrador->save();

        return response()->json($administrador, 201);
    }

    // Resto de las funciones (index, show, update, destroy) pueden ser generadas por el comando `php artisan make:controller --resource AdministradorController`

    // Estructura básica de las otras funciones:

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $administradores = Administrador::all();
        return response()->json($administradores);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $administrador = Administrador::find($id);
        if (!$administrador) {
            return response()->json(['error' => 'Administrador no encontrado'], 404);
        }
        return response()->json($administrador);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $administrador = Administrador::find($id);
        if (!$administrador) {
            return response()->json(['error' => 'Administrador no encontrado'], 404);
        }

        $request->validate([
            'nombreAdministrador' => 'required|string|max:255',
            'passwordAdministrador' => 'nullable|string|min:6',
            'correoAdministrador' => 'required|email|unique:administrador,correoAdministrador,' . $administrador->idAdministrador,
        ]);

        $administrador->nombreAdministrador = $request->input('nombreAdministrador');
        if ($request->has('passwordAdministrador')) {
            $administrador->passwordAdministrador = bcrypt($request->input('passwordAdministrador'));
        }
        $administrador->correoAdministrador = $request->input('correoAdministrador');
        $administrador->save();

        return response()->json($administrador);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $administrador = Administrador::find($id);
        if (!$administrador) {
            return response()->json(['error' => 'Administrador no encontrado'], 404);
        }
        $administrador->delete();
        return response()->json(['message' => 'Administrador eliminado con éxito']);
    }
}
