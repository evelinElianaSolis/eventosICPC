<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReglasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regla', function (Blueprint $table) {
            $table->id('idRegla');
            $table->string('nombreRegla');
            $table->string('descripcionRegla')->nullable();
            $table->unsignedBigInteger('idEvento');
            $table->foreign('idEvento')->references("idEvento")->on("Evento");
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
        Schema::dropIfExists('regla');
    }
}
