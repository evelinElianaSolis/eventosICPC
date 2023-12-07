<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Administrador;


class AdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('administrador')->insert([
            'idAdministrador' => '87654321',
            'nombreAdministrador' => 'Robert Paya',
            'passwordAdministrador' => "12345678", 
            'correoAdministrador' => 'RobertPaya@gmail.com',
        ]);
    }
}
