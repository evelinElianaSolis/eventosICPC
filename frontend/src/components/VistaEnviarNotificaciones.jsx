// src/components/EnviarCorreo.js

import React, { useState } from 'react';
import axios from './api/conexionApi';

const EnviarCorreo = (evento, equipo) => {
    const [destinatario, setDestinatario] = useState(null);
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [saludo, setSaludo] = useState('Para confirmar ingrese este código');
    const [personas, setPersonas] = useState(null);
    const [participantes, setParticipantes] = useState(null);
    const [entrenadores, setEntrenadores] = useState(null);
    const [correos, setCorreos] = useState(null);
    const [equipos, setEquipos] = useState(null);

if(equipo==='Grupal'){

}else{

}


    const obtenerCorreosPorIds = async () => {
        if(equipo==='Grupal'){
            idEquiposPorEvento();
            encontrarIdEntrenadoresPorEquipos();
            encontrarIdParticipantesPorEquipos();
            const todosLosUsuarios = [...entrenadores, ...participantes];

            try {
                
                const response = await axios.get(`/obtenerCorreosPorIds`,todosLosUsuarios);
                setDestinatario(response.data.correos);
                console.log(response.data); // Aquí puedes manejar la respuesta según tus necesidades
              } catch (error) {
                console.error('Error al obtener correos por IDs:', error);
              }
        }else{
            obtenerIdsParticipantesPorEvento();
            try {
                const response = await axios.get(`/obtenerCorreosPorIds`,participantes);
                setDestinatario(response.data.correos);
                console.log(response.data); // Aquí puedes manejar la respuesta según tus necesidades
              } catch (error) {
                console.error('Error al obtener correos por IDs:', error);
              }
        }
       
      };


// Obtener IDs de equipos por evento
const idEquiposPorEvento = async () => {
    try {
     console.log(evento);
     console.log(evento.evento);

      const response = await axios.get(`./idEquiposPorEvento/${evento}`);
      setEquipos(response.data.equipos);
      console.log(response.data); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al obtener IDs de equipos por evento:', error);
    }
  };
  
  // Obtener IDs de entrenadores por equipos
  const encontrarIdEntrenadoresPorEquipos = async () => {
    try {
      const response = await axios.get(`./encontrarIdEntrenadoresPorEquipos`,equipos);
      setEntrenadores(response.data.entrenadores)
      console.log(response.data); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al encontrar IDs de entrenadores por equipos:', error);
    }
  };
  
  // Obtener IDs de participantes por equipos
  const encontrarIdParticipantesPorEquipos = async () => {
    try {
      const response = await axios.get(`./encontrarIdPartcicipantesPorEquipos`,equipos);
      setParticipantes(response.data.idParticipantes)
      console.log(response.data); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al encontrar IDs de participantes por equipos:', error);
    }
  };
  
  // Obtener IDs de participantes por evento
  const obtenerIdsParticipantesPorEvento = async () => {
    try {
      const response = await axios.get(`./obtenerIdsParticipantesPorEvento/${evento}`);
      setParticipantes(response.data.idParticipantes);
      console.log(response.data); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al obtener IDs de participantes por evento:', error);
    }
  };



    const enviarCorreo = async () => {
        obtenerCorreosPorIds();
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
           
            <label>Asunto:</label>
            <input type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />

            <label>Mensaje:</label>
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />

            <button onClick={enviarCorreo}>Enviar Correo</button>
        </div>
    );
};

export default EnviarCorreo;
