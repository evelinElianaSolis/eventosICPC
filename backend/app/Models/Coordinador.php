<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coordinador extends Model
{
    use HasFactory;
    protected $table = 'coordinador';
    protected $primaryKey = 'idCoordinador';
    protected $fillable = ['passwordCoordinador'];
    public $timestamps = false;
    public function evento()
    {
        return $this->hasmany(evento::class, 'idEvento');
    }
}
