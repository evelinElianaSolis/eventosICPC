<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntrenadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entrenador', function (Blueprint $table) {
            $table->id('idEntrenador')->primary(); // Campo UUID y clave primaria            $table->string('idPersona',36); // Campo UUID y clave primaria

            $table->string('idPersona',36); 

            $table->unsignedBigInteger('idEquipo')->nullable();
            $table->foreign('idEquipo')->references('idEquipo')->on('equipo')->nullable();
            $table->foreign('idPersona')->references('idPersona')->on('idPersona');


///$table->string('passwordEntrenador');
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
        Schema::dropIfExists('entrenador');
    }
}
