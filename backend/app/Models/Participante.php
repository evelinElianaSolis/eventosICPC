<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class participante extends Model
{
    use HasFactory;
    protected $table = 'participante';
    protected $primaryKey = 'idParticipante';
    protected $fillable = [
        'idPersona',
        'idEvento',
        'idEquipo'
    ];
    public $timestamps = false;

    public function evento()
    {
        return $this->belongsTo(evento::class, 'idEvento');
    }

    public function equipo()
    {
        return $this->belongsTo(equipo::class, 'idEquipo')->optional();
    }
    public function persona()
    {
        return $this->belongsTo(Persona::class, 'idPersona', 'idPersona');
    }
}