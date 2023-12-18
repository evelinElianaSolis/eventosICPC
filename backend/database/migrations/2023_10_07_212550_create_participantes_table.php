<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParticipantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participante', function (Blueprint $table) {
            $table->id('idParticipante');
            $table->string('idPersona',36); // Campo UUID y clave primaria

            $table->unsignedBigInteger('idEvento');
            $table->unsignedBigInteger('idEquipo')->nullable();
            $table->foreign('idEvento')->references('idEvento')->on('evento');
            $table->foreign('idEquipo')->references('idEquipo')->on('equipo')->nullable();
            $table->foreign('idPersona')->references('idPersona')->on('persona')->nullable();

            //$table->foreign('idPersona')->references('idPersona')->on('persona');
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
        Schema::dropIfExists('participante');
    }
}
