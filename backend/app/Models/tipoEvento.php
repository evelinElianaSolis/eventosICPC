<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoEvento extends Model
{
    use HasFactory;
    protected $table = 'tipoEvento';
    protected $primaryKey = 'idTipoEvento';
    protected $fillable = ['nombreTipoEvento', 'descripcionTipoEvento'];

    public $timestamps = false;

        
}
