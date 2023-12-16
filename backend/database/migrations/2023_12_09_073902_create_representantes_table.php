<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepresentantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('representante', function (Blueprint $table) {
            $table->id('idRepresentante')->primary(); // Campo UUID y clave primaria

            $table->string('idPersona',36); // Campo UUID y clave primaria
            $table->unsignedBigInteger('idEquipo')->nullable();
            $table->foreign('idEquipo')->references('idEquipo')->on('equipo')->nullable();
            $table->foreign('idPersona')->references('idPersona')->on('idPersona');

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
        Schema::dropIfExists('representantes');
    }
}
