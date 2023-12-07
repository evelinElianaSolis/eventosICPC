<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class requisito extends Model
{
    use HasFactory;
    protected $table = 'requisito';
    protected $primaryKey = 'idRequisito';
    protected $fillable = [
        'nombreRequisito',
        'descripcionRequisito',
        'idEvento'
    ];

    public function evento()
    {
        return $this->belongsTo(evento::class, 'idEvento');
    }
}
