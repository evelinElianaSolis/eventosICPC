<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class equipo extends Model
{
    use HasFactory;
    protected $table = 'equipo';
    protected $primaryKey = 'idEquipo';
    protected $fillable = ['nombreEquipo','descripcionEquipo','idEvento'];
    public $timestamps = false;

    

   /* public function participantes()
    {
        return $this->hasMany(participante::class, 'idParticipantes');
    }*/
    public function evento()
    {
        return $this->hasOne(evento::class, 'idEvento');
    }
}
