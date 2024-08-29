<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCorreosTable extends Migration
{
    /** 
     * Run the migrations.
     *
     * @return void 
     */
    public function up()
    {
        Schema::create('correo', function (Blueprint $table) {
            $table->id('idCorreo');
            $table->string('correoC');
            $table->boolean('estadoNotificacion');
            $table->string('idPersona')->nullable();
            $table->foreign('idPersona')->references('idPersona')->on('persona');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.  :)
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('correo');
    }
}
