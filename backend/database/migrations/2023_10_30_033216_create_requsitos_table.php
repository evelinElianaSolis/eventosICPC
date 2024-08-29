<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequsitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requisito', function (Blueprint $table) {
            $table->id('idRequisito');
            $table->string('nombreRequisito');
            $table->string('descripcionRequisito')->nullable();
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
        Schema::dropIfExists('requsito');
    }
}
