<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void 
     */
    public function up()
    {
        Schema::create('persona', function (Blueprint $table) {
            $table->string('idPersona',36)->primary();;
            $table->string('nombrePersona');
            $table->string('apellidoPersona');
            $table->string('genero',1);
            $table->string('telefonoPersona')->nullable();
        //    $table->string('correoPersona');
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
        Schema::dropIfExists('persona');
    }
}
