<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\CorreoController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\TipoEventoController;
use App\Http\Controllers\ActividadController;
use App\Http\Controllers\RequisitoController;
use App\Http\Controllers\ReglaController;
use App\Http\Controllers\ParticipanteController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EntrenadorController;
use App\Http\Controllers\RepresentanteController;

/*namespace App\Http\Controllers\API;
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::POST('/correos', [CorreoController::class,'store']);
Route::POST('/storePersona', [PersonaController::class,'store']);
Route::POST('/storeParticipante', [ParticipanteController::class,'store']);
Route::POST('/storeEntrenador', [EntrenadorController::class,'store']);
Route::POST('/storeEquipo', [EquipoController::class,'store']);
Route::GET('/equiposPorEvento/{idEvento}', [EquipoController::class,'equiposPorEvento']);
Route::GET('/obtenerUltimoIdEquipo', [EquipoController::class,'obtenerUltimoIdEquipo']);
Route::GET('/buscarEquipo/{idEquipo}', [EquipoController::class,'buscarEquipo']);

Route::PUT('/actualizarEquipo/{idEquipo}', [EquipoController::class,'actualizar']);
Route::DELETE('/destroyEquipo/{idEquipo}', [EquipoController::class,'destroy']);

Route::POST('/evento', [EventoController::class,'store']);
Route::GET('/index', [EventoController::class,'index']);
Route::GET('/eventoConActividad', [EventoController::class,'eventoConActividad']);
Route::GET('/eventosConActividadGrupal', [EventoController::class,'eventosConActividadGrupal']);

Route::GET('/eventosConActividadIndividual', [EventoController::class,'eventosConActividadIndividual']);
Route::GET('/eventosFuturos', [EventoController::class,'eventosFuturos']);
Route::GET('/ultimosEventos', [EventoController::class,'ultimosEventos']);
Route::GET('/ActividadesSinCronGral', [EventoController::class,'ActividadesSinCronGral']);

Route::POST('/postActividad', [ActividadController::class,'store']);
Route::POST('/postRequisito', [RequisitoController::class,'store']);
Route::POST('/postRegla', [ReglaController::class,'store']);
Route::POST('/administrador', [AdministradorController::class,'store']);
Route::POST('/crearTipoEvento', [TipoEventoController::class,'store']);
Route::GET('/eventos/{id}', [EventoController::class,'show']);
Route::GET('/imgevento/{id}', [EventoController::class,'devolverimagen']);
Route::GET('/obtenerReglasDeEvento/{idEvento}', [EventoController::class,'obtenerReglasDeEvento']);
Route::GET('/obtenerRequisitosDeEvento/{idEvento}', [EventoController::class,'obtenerRequisitosDeEvento']);
Route::GET('/obtenerActividadesDeEvento/{idEvento}', [EventoController::class,'obtenerActividadesDeEvento']);
Route::GET('/obtenerTipoDeEvento/{idTipoEvento}', [EventoController::class,'obtenerTipoDeEvento']);
Route::GET('/buscarActividadPorNombre/{idEvento}/{nombreActividad}', [ActividadController::class,'buscarActividadPorNombre']);
Route::PUT('/eventoActualizar/{idEvento}', [EventoController::class,'update']);
Route::GET('/obtenerUltimoIdEvento', [EventoController::class,'obtenerUltimoIdEvento']);

Route::GET('/obtenerParticipantesPorEquipo/{idEquipo}', [ParticipanteController::class,'obtenerParticipantesPorEquipo']);
Route::GET('/obtenerParticipantesYPersonasPorEquipo/{idEquipo}', [ParticipanteController::class,'obtenerParticipantesYPersonasPorEquipo']);
Route::DELETE('/eliminarParticipanteYPersona/{idEquipo}/{idParticipante}', [ParticipanteController::class,'eliminarParticipanteYPersona']);
Route::GET('/getParticipantsInfoByEventId/{idEvento}', [ParticipanteController::class,'getParticipantsInfoByEventId']);

Route::GET('/obtenerEntrenadoresPorEquipo/{idEquipo}', [EntrenadorController::class,'obtenerEntrenadoresPorEquipo']);
Route::DELETE('/destroyEntrenador/{idEntrenador}', [EntrenadorController::class,'destroy']);

Route::POST('/storeRepresentante', [RepresentanteController::class,'store']);
Route::GET('/buscarPorId/{pais}/{idPersona}', [PersonaController::class,'buscarPorId']);
Route::post('/enviar-correo', [CorreoController::class, 'enviarCorreo']);
Route::GET('/buscarPorIdTF/{pais}/{idPersona}', [PersonaController::class,'buscarPorIdTF']);
