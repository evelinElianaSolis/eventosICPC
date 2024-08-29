<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class regla extends Model
{
    use HasFactory;
    protected $table = 'regla';
    protected $primaryKey = 'idRegla';
    protected $fillable = [
        'nombreRegla',
        'descripcionRegla',
        'idEvento'
    ];

    public function Evento()
    {
        return $this->belongsTo(evento::class, 'idEvento');
    }
}
