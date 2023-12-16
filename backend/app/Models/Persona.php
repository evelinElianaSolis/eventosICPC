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
    public function participantes()
    {
        return $this->hasMany(Participante::class, 'idPersona', 'idPersona');
    }
    public function representante()
    {
        return $this->hasMany(representante::class, 'idPersona', 'idPersona');
    }
    public function entrenador()
    {
        return $this->hasMany(entrenador::class, 'idPersona', 'idPersona');
    }

    /*public function correo()
    {
        return $this->hasOne(correo::class, 'idCorreo');
    }*/
}
