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
        $representante = new representante;
            $representante->idRepresentante = $request->input('idRepresentante');
            $representante->idEquipo = $request->input('idEquipo');
            $representante->save();
            return response()->json(['message' => 'representante creado con éxito', 'representante' => $representante], 201);
       } catch (\Exception $e) {
            
            return response()->json(['message' => 'Error al crear el representante', 'error' => $e->getMessage()], 500);
        }
        }
    
}
