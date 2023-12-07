<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Correo extends Model
{
    use HasFactory;
    protected $table = 'correo';
    protected $primaryKey = 'idCorreo';
    protected $fillable = [
        'correoC',
        'estadoNotificacion',
        'idPersona'
    ];
    public $timestamps = false;
    
    public function persona()
    {
        return $this->belongsTo(persona::class,'idPersona');
    }
}
