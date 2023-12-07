<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActividadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actividad', function (Blueprint $table) {
            $table->id('idActividad');
            $table->string('nombreActividad');
            $table->string('descripcionActividad')->nullable();
            $table->string('modalidad'); 
            $table->date('fechaInicioActividad');
            $table->date('fechaFinActividad');
            $table->time('horaInicioActividad');
            $table->string('ubicacionActividad');
            $table->unsignedBigInteger('idEvento');
            $table->foreign('idEvento')->references("idEvento")->on("evento");
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
        Schema::dropIfExists('actividad');
    }
}
