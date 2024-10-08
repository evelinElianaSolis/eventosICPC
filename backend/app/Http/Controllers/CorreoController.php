<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotificacionesICPC;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {


        $destinatarios = $request->destinatario;
        $correo = new NotificacionesICPC(
            $request->mensaje,
            $request->asunto,
        );

        // Comprobar si es un arreglo de destinatarios o un único destinatario
       
        try {
            if (!is_array($destinatarios)) {
                $destinatarios = [$destinatarios]; // Convertir en arreglo
            }
    
            foreach ($destinatarios as $destinatario) {
                // Enviar correo a cada destinatario
                Mail::to($destinatario)->send($correo);
            }            

            return response()->json(['mensaje' => 'Correo enviado con éxito']);
        } catch (\Exception $e) {
            // Devolver una respuesta de error con el mensaje
            return response()->json([
                'error' => 'Error al enviar el correo',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }
}



/*
use Illuminate\Http\Request;
use App\Models\Correo;
class CorreoController extends Controller
{
    
    public function index()
    {
        
    }

    
    public function create()
    {
    } 
    
       
    

   
    public function store(Request $request)
    {
        try{
            $correo = new correo;
            $correo->correoC=$request->input('correoC');
            $correo->estadoNotificacion=$request->input('estadoNotificacion');    
            $correo->idPersona=$request->input('idPersona');
        
            $correo->save();
        
            return response()->json(['message' => 'Correo creado con éxito'], 201); 
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear correo', 'error' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
    }

    
    public function edit($id)
    {
    }

    public function update(Request $request, $id)
    {
        
    }

    
    public function destroy($id)
    {
        
    }
}

*/
