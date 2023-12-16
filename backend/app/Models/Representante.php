<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Representante extends Model
{
    use HasFactory;
    protected $table = 'participante';
    protected $primaryKey = 'idParticipante';
    protected $fillable = [
        'idPersona',
        'idEquipo'
    ];
    public $timestamps = false;

public function equipo()
{
    return $this->belongsTo(equipo::class, 'idEquipo')->optional();
}
public function persona()
    {
        return $this->belongsTo(Persona::class, 'idPersona', 'idPersona');
    }
}