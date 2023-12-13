<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotificacionesICPC extends Mailable
{
    //public $destinatario;
    public $saludo;
    public $mensaje;
    public $asunto;

    public function __construct($saludo, $mensaje, $asunto)
    {
        $this->saludo = $saludo;
        $this->mensaje = $mensaje;
        $this->asunto = $asunto;
    }
 


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
{
    return $this->subject($this->asunto)
    ->from(config('mail.from.address'), 'Avisos de Eventos ICPC' )

    ->view('mails.correo', [
        'saludo' => $this->saludo,
        'mensaje' => $this->mensaje
    ]);
}

}
