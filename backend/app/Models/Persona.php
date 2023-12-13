<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class persona extends Model
{
    use HasFactory;
    protected $table = 'persona';
    protected $primaryKey = 'idPersona';
    protected $fillable = [
        'nombrePersona',
        'apellidoPersona',
        'genero',
        'pais',
        'correo',
       // 'correoPersona'
    ];
    public $timestamps = false;

    /*public function correo()
    {
        return $this->hasOne(correo::class, 'idCorreo');
    }*/
}
