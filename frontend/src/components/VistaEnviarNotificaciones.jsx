// src/components/EnviarCorreo.js

import React, { useState } from 'react';
import axios from './api/conexionApi';

const EnviarCorreo = () => {
    const [destinatario, setDestinatario] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [saludo, setSaludo] = useState('Para confirmar ingrese este código');

    const enviarCorreo = async () => {
        try {
            const response = await axios.post('/enviar-correo', {
                destinatario,
                saludo,
                mensaje,
                asunto
            });

            console.log(response.data.mensaje);
        } catch (error) {
            console.error('Error al enviar el correo', error);
        }
    };

    return (
        <div>
            <label>Destinatario:</label>
            <input type="text" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} />

            <label>Asunto:</label>
            <input type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />

            <label>Mensaje:</label>
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />

            <button onClick={enviarCorreo}>Enviar Correo</button>
        </div>
    );
};

export default EnviarCorreo;
