<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class evento extends Model
{
    
    use HasFactory;
    protected $table = 'evento';
    protected $primaryKey = 'idEvento';
    protected $fillable = ['tituloEvento',
    'participacion','numParticipantes','numEntrenadores','descripcionEvento',
     'estadoEvento','aficheEvento',
    'idTipoEvento','idAdministrador',];
    /*
        protected $fillable = ['tituloEvento','fechaInicioEvento','fechaFinEvento','modalidad',
    'participacion','numParticipantes','numEntrenadores','descripcionEvento','requisitosEvento',
    'ubicacion','estadoEvento','horaInicioEvento','aficheEvento',
    'reglas','idTipoEvento','idAdministrador',];
    */
    public $timestamps = false;
    
    public function TipoEvento()
    {
        return $this->belongsTo(tipoEvento::class, 'idTipoEvento');
        
    }
    public function Administrador()
    {
        return $this->hasMany(administrador::class, 'idAdministrador');
        
    }
    /*public function actividades()
    {
        return $this->hasMany(actividad::class, 'idEvento');
    }
    public function requisitos()
    {
        return $this->hasMany(requisito::class, 'idEvento');
    }
    public function reglas()
    {
        return $this->hasMany(regla::class, 'idEvento');
    }*/
    
}