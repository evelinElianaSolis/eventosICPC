<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Tipo_Evento;
use Illuminate\Support\Facades\DB;

class TipoEventoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipoEvento')->insert([
            'nombreTipoEvento' => 'Competencia',
            'descripcionTipoEvento'=> ' no desc',
        ]);

        DB::table('tipoEvento')->insert([
            'nombreTipoEvento' => 'Taller de Entrenamiento',
            'descripcionTipoEvento'=> ' no desc',
        ]);

        DB::table('tipoEvento')->insert([
            'nombreTipoEvento' => 'Seminario',
            'descripcionTipoEvento'=> ' no desc',
        ]);

        DB::table('tipoEvento')->insert([
            'nombreTipoEvento' => 'Feria',
            'descripcionTipoEvento'=> ' no desc',
        ]);

        DB::table('tipoEvento')->insert([
            'nombreTipoEvento' => 'Convivencia',
            'descripcionTipoEvento'=> ' no desc',
        ]);
    }
}
