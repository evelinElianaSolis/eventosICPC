<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evento;
use App\Models\Actividad;
use App\Models\Requisito;
use App\Models\Regla;
use App\Models\TipoEvento;
class EventoController extends Controller
{
    /**
     * Obtener todos los eventos.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $eventos = evento::all(); // Recupera todos los eventos

            return response()->json(['eventos' => $eventos], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al recuperar los eventos', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Crear un nuevo evento.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {       
        try {
            $evento= new evento;
            $evento->idEvento = $request->input('idEvento');
            $evento->tituloEvento = $request->input('tituloEvento');
            $evento->participacion = $request->input('participacion');
            $evento->numParticipantes = $request->input('numParticipantes');
            $evento->numEntrenadores = $request->input('numEntrenadores');
            $evento->descripcionEvento = $request->input('descripcionEvento');
            $evento->estadoEvento = $request->input('estadoEvento');
            $evento->aficheEvento = $request->input('aficheEvento');
            $evento->idTipoEvento = $request->input('idTipoEvento');
            $evento->idAdministrador = $request->input('idAdministrador');
            $evento->save();
            return response()->json(['message' => 'Evento creado con éxito', 'evento' => $evento], 201);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al crear el evento', 'error' => $e->getMessage()], 500);
        }
    }

    public function eventosFuturos()
    {
        $fechaActual = date('Y-m-d 00:00:00');
        try {
            $eventos = evento::all(); // Recupera todos los eventos con actividades
    
            $eventosFuturo = [];
    
            foreach ($eventos as $evento) {
                $actividades = actividad::where('idEvento', $evento->idEvento)
                    ->where('nombreActividad', 'Cronograma general')
                    ->where('fechaFinActividad', '>=', $fechaActual)
                    ->get();
    
                if (!$actividades->isEmpty()) {
                    $eventosFuturo [] = [
                        'evento' => $evento,
                        'actividades' => $actividades,
                    ];
                }
            }
    
            return response()->json(['eventosConProgramaGeneral' => $eventosFuturo ], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al recuperar los eventos futuros', 'error' => $e->getMessage()], 500);
        }
    }
    


    public function ultimosEventos()
    {
        try {
            $ultimosEventos = evento::latest()->take(10)->get();

            return response()->json(['message' => 'Últimos 10 eventos recuperados con éxito', 'ultimosEventos' => $ultimosEventos], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al recuperar los últimos eventos', 'error' => $e->getMessage()], 500);
        }
    }

    

    /**
     * Obtener un evento específico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Buscar el producto en la base de datos por su ID
        $event = evento::find($id);

        if (!$event) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        return response()->json(['evento' => $event], 200);
    }

    public function devolverimagen($id)
    {
        // Buscar el producto en la base de datos por su ID
        $event = evento::find($id);
        
        if (!$event) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        return response()->json(['evento' => $event->aficheEvento], 200);
    }



    public function obtenerActividadesDeEvento($idEvento)
    {
        $actividades = actividad::where('idEvento', $idEvento)->get();

        if ($actividades->isEmpty()) {
            return response()->json(['message' => 'No se encontraron actividades para este evento con ID ' . $idEvento], 404);
        }
        return response()->json(['actividades' => $actividades], 200);
    }



    public function obtenerReglasDeEvento($idEvento)
    {
        $reglas = regla::where('idEvento', $idEvento)->get();

        if ($reglas->isEmpty()) {
            return response()->json(['message' => 'No se encontraron reglas para el Evento con ID ' . $idActividad], 404);
        }
        return response()->json(['reglas' => $reglas], 200);
    }


    public function obtenerRequisitosDeEvento($idEvento)
    {
        $requisitos = requisito::where('idEvento', $idEvento)->get();

        if ($requisitos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron requisitos para el Evento con ID ' . $idEvento], 404);
        }
        return response()->json(['requisitos' => $requisitos], 200);
    }


    public function obtenerTipoDeEvento($idTipoEvento)
    {
        $tipo = tipoEvento::where('idTipoEvento', $idTipoEvento)->get();

        if ($tipo->isEmpty()) {
            return response()->json(['message' => 'No se encontrado el tipo para este evento con ID ' . $idTipoEvento ], 404);
        }
        return response()->json(['tipo' => $tipo], 200);
    }


  
    public function eventoConActividad()
    {
        try {
            $eventos = evento::all(); // Recupera todos los eventos con actividades
    
            $eventosConProgramaGeneral = [];
    
            foreach ($eventos as $evento) {
                $actividades = actividad::where('idEvento', $evento->idEvento)
                    ->where('nombreActividad', 'Cronograma general')
                    ->get();
    
                if (!$actividades->isEmpty()) {
                    $eventosConProgramaGeneral[] = [
                        'evento' => $evento,
                        'actividades' => $actividades,
                    ];
                }
            }
    
            return response()->json(['eventosConProgramaGeneral' => $eventosConProgramaGeneral], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al recuperar los eventos', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function eventoContodasLasActividades()
    {
        try {
            $eventos = evento::all(); // Recupera todos los eventos con actividades
    
            $eventosConProgramaGeneral = [];
    
            foreach ($eventos as $evento) {
                $actividades = actividad::where('idEvento', $evento->idEvento)
                    ->get();
    
                if (!$actividades->isEmpty()) {
                    $eventosConProgramaGeneral[] = [
                        'evento' => $evento,
                        'actividades' => $actividades,
                    ];
                }
            }
    
            return response()->json(['eventosConProgramaGeneral' => $eventosConProgramaGeneral], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al recuperar los eventos', 'error' => $e->getMessage()], 500);
        }
    }


    public function ActividadesSinCronGral($idEvento)
    {
        try {
            $evento = evento::find($idEvento);    
            if (!$evento) {
                return response()->json(['message' => 'Evento no encontrado'], 404);
            }    
            $actividades = actividad::where('idEvento', $evento->idEvento)
                ->where('nombreActividad', '!=', "Cronograma general")
                ->get();
    
            if (!$actividades->isEmpty()) {
                return response()->json($actividades, 200);
            } else {
                return response()->json([], 200);
            }
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al recuperar las actividades', 'error' => $e->getMessage()], 500);
        }
    }
    

    public function eventosConActividadGrupal()
{
    $fechaActual = date('Y-m-d 00:00:00');

    try {
        $eventos = evento::where('participacion', 'Grupal')
        ->get();

        $eventosConActividadGrupal = [];

        
        foreach ($eventos as $evento) {
            
            $actividades = actividad::where('idEvento', $evento->idEvento)
            ->where('nombreActividad', 'Cronograma general')
            ->where('fechaInicioActividad', '>=', $fechaActual)
            ->get();

            // Verifica si hay actividades y agrega el evento a la lista
            if (!$actividades->isEmpty()) {
                $eventosConActividadGrupal[] = [
                    'evento' => $evento,
                    'actividades' => $actividades,
                ];
            }
        }

        return response()->json(['eventosConActividadGrupal' => $eventosConActividadGrupal], 200);
    } catch (\Exception $e) {
        // Manejar errores
        return response()->json(['message' => 'Error al recuperar los eventos', 'error' => $e->getMessage()], 500);
    }
}


public function eventosConActividadIndividual()
{
    $fechaActual = date('Y-m-d 00:00:00');

    try {
        $eventos = evento::where('participacion', 'Individual')
        ->get();

        $eventosConActividadIndividual = [];

        foreach ($eventos as $evento) {
            
            $actividades = actividad::where('idEvento', $evento->idEvento)
            ->where('nombreActividad', 'Cronograma general')
            ->where('fechaInicioActividad', '>=', $fechaActual)

               ->get();

            // Verifica si hay actividades y agrega el evento a la lista
            if (!$actividades->isEmpty()) {
                $eventosConActividadIndividual[] = [
                    'evento' => $evento,
                    'actividades' => $actividades,
                ];
            }
        }

        return response()->json(['eventosConActividadIndividual' => $eventosConActividadIndividual], 200);
    } catch (\Exception $e) {
        // Manejar errores
        return response()->json(['message' => 'Error al recuperar los eventos', 'error' => $e->getMessage()], 500);
    }
}

    public function encontrarIdEvento(Request $request)
    {
        try {
            
            // Buscar el evento por los atributos proporcionados
            $evento = evento::where([
                'tituloEvento' => $request->input('tituloEvento'),
                'participacion' => $request->input('participacion'),
                'numParticipantes' => $request->input('numParticipantes'),
                'numEntrenadores' => $request->input('numEntrenadores'),
                'descripcionEvento' => $request->input('descripcionEvento'),
                'estadoEvento' => $request->input('estadoEvento'),
                'aficheEvento' => $request->input('aficheEvento'),
                'idTipoEvento' => $request->input('idTipoEvento'),
                'idAdministrador' => $request->input('idAdministrador'),




            ])->first();

            // Verificar si el evento existe
            if (!$evento) {
                return response()->json(['message' => 'No se encontró ningún evento con los atributos proporcionados'], 404);
            }

            return response()->json(['message' => 'ID de evento encontrado con éxito', 'idEvento' => $evento->id], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['message' => 'Error al encontrar el ID de evento', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Actualizar un evento existente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idEvento)
{
    try {
        // Buscar el evento por ID
        $evento = evento::find($idEvento);

        // Verificar si el evento existe
        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        // Actualizar los campos del evento con los nuevos valores
        $evento->participacion = $request->input('participacion');
        $evento->numParticipantes = $request->input('numParticipantes');
        $evento->numEntrenadores = $request->input('numEntrenadores');
        $evento->aficheEvento = $request->input('aficheEvento');

        $evento->save();

        return response()->json(['message' => 'Evento actualizado con éxito', 'evento' => $evento], 200);
    } catch (\Exception $e) {
        // Manejar errores
        return response()->json(['message' => 'Error al actualizar el evento', 'error' => $e->getMessage()], 500);
    }
}

public function obtenerUltimoIdEvento(Request $request)
{
    // Obtener el último ID de la tabla de eventos
    $ultimoId = Evento::max('idEvento');

    // $ultimoId contendrá el valor del último ID en la tabla de eventos
    return response()->json(['ultimoId' => $ultimoId]);
}



    /**
     * Eliminar un evento.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }
}
