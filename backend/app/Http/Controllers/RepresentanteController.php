<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Representante;
use App\Models\Equipo;

class RepresentanteController extends Controller
{
    public function store(Request $request)
    {
       
       try{

        $existingResponsable = responsable::where('idPersona', $request->input('idPersona'))
        ->where('idEquipo', $request->input('idEquipo'))
        ->first();

    if ($existingResponsable) {
        // Si ya existe, devolver un mensaje de error
        return response()->json(['message' => 'La persona ya está registrada en ese equipo.'], 400);
    }
        $representante = new representante;
            $representante->idPersona = $request->input('idPersona');
            $representante->idEquipo = $request->input('idEquipo');
            $representante->save();
            return response()->json(['message' => 'representante creado con éxito', 'representante' => $representante], 201);
       } catch (\Exception $e) {
            
            return response()->json(['message' => 'Error al crear el representante', 'error' => $e->getMessage()], 500);
        }
        }
    
}
