<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class administrador extends Model
{
    use HasFactory;
    
    protected $table = 'administrador';
    protected $primaryKey = 'idAdministrador';
    protected $fillable = ['nombreAdministrador','passwordAdministrador','correoAdministrador'];
    public $timestamps = false;

        public function evento(){
            return $this->hasMany(evento::class,'idEvento');
        }
}
