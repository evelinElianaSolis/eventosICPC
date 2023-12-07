<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class actividad extends Model
{
    use HasFactory;
    protected $table = 'actividad';
    protected $primaryKey = 'idActividad';
    protected $fillable = [ 
        'nombreActividad',
        'descripcionActividad',
        'modalidad',
        'fechaInicioActividad',
        'fechaFinActividad',
        'horaInicioActividad',
        'ubicacionActividad',
        'idEvento'          ];
    public $timestamps = false;
    
    public function evento()
    {
        return $this->belongsTo(evento::class, 'idEvento');
    }
    
}
