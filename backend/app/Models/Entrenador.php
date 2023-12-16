<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class entrenador extends Model
{
    use HasFactory;
    protected $table = 'entrenador';
    protected $primaryKey = 'idEntrenador';
    protected $fillable = [
      'idPersona',
        'idEquipo'
    ];
    public function equipo()
    {
        return $this->belongsTo(equipo::class, 'idEquipo')->optional();
    }
    public $timestamps = false;
    public function persona()
    {
        return $this->belongsTo(Persona::class, 'idPersona', 'idPersona');
    }
        //public function categoria(){
        //    return $this->belongsTo(categoria::class,'codcat');
        //}
}
