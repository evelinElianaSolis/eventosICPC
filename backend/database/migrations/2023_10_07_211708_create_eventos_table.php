<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('evento', function (Blueprint $table) {
    $table->id('idEvento'); // Campo UUID y clave primaria
    $table->string('tituloEvento');
    //$table->date('fechaInicioEvento');  
    //$table->date('fechaFinEvento'); 
    //$table->string('modalidad');  
    $table->string('participacion'); //grupal o individua;
    $table->integer('numParticipantes')->nullable(); 
    $table->integer('numEntrenadores')->nullable(); 
    $table->text('descripcionEvento')->nullable(); 
    //$table->text('requisitosEvento');
    //$table->string('ubicacion');
    $table->boolean('estadoEvento')->nullable();
   // $table->time('horaInicioEvento');
    $table->text('aficheEvento');
   // $table->text('reglas');
    $table->unsignedBigInteger('idTipoEvento'); // Campo UUID para idTipoEvento
    $table->string('idAdministrador'); // Campo UUID para idAdministrado
    $table->foreign('idAdministrador')->references('idAdministrador')->on('administrador');
    $table->foreign('idTipoEvento')->references('idTipoEvento')->on('tipoEvento');
    $table->timestamps();
});
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evento');
    }
}
