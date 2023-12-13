// src/utils/enviarCorreo.js

import axios from '../api/conexionApi';

const enviarCorreo = async (destinatario, asunto, mensaje, saludo) => {
    try {
        const response = await axios.post('/enviar-correo', {
            destinatario,
            saludo,
            mensaje,
            asunto
        });

        console.log(response.data.mensaje);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el correo', error);
        throw error;
    }
};

export default enviarCorreo;
