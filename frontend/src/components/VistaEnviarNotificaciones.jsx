// src/components/Enviarmensaje.js

import React, { useState } from 'react';
import axios from './api/conexionApi';
import ModalError from './ModalErrorRegistro';
import validate from './utils/Validaciones';
import './assets/Notificaciones.css'
const Enviarmensaje = (evento, equipo) => {
    const [destinatario, setDestinatario] = useState(null);
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [saludo, setSaludo] = useState('Para confirmar ingrese este código');
    const [personas, setPersonas] = useState(null);
    const [participantes, setParticipantes] = useState(null);
    const [entrenadores, setEntrenadores] = useState(null);
    const [mensajes, setmensajes] = useState(null);
    const [equipos, setEquipos] = useState(null);
    const [ModalSinRegistrosDeParticipantes, setModalSNRegistroParticipantes] = useState(false);
    const [errorAsunto, setErrorAsunto] = useState('');
    const [error, setErrorMensaje] = useState({
asuntoError:'',
mensajeError:''
    });
    


const cerrarModalError=()=>{
setModalSNRegistroParticipantes(false);
}


    const obtenerCorreosPorIds = async () => {
      console.log("el equipo es jcnkjdfnkr",evento.equipo)
      console.log("el equipo es jcnkjdfnkr",evento.evento)
        if(evento.equipo==='Grupal'){
            idEquiposPorEvento();
            if(!equipos || equipos.length===0){
             //mostrar modal no existen equipos registrados
             setModalSNRegistroParticipantes(true);

            }else{
              encontrarIdEntrenadoresPorEquipos();
              encontrarIdParticipantesPorEquipos();
              const todosLosUsuarios = [...entrenadores, ...participantes];
              console.log("estos son todos los ids", todosLosUsuarios)
              try {                
                const response = await axios.get(`/obtenerCorreosPorIds`,todosLosUsuarios);
                setDestinatario(response.data.correos);
                console.log(response.data.correos); // Aquí puedes manejar la respuesta según tus necesidades
                console.log(destinatario); // Aquí puedes manejar la respuesta según tus necesidades

              } catch (error) {
                console.error('Error al obtener mensajes por IDs:', error);
              }
            }            
        }else{
            obtenerIdsParticipantesPorEvento();
             if(!participantes || participantes.length===0){
              //mostrar modal no existen equipos registrados
              setModalSNRegistroParticipantes(true);

             }else{
            try {
                const response = await axios.get(`/obtenerCorreosPorIds`,participantes);
                setDestinatario(response.data.correos);
                console.log(response.data.correos); // Aquí puedes manejar la respuesta según tus necesidades
              } catch (error) {
                console.error('Error al obtener mensajes por IDs:', error);
              }
            }
        }
       
      };


// Obtener IDs de equipos por evento
const idEquiposPorEvento = async () => {
    try {
      console.log(evento.evento);
      const response = await axios.get(`./idEquiposPorEvento/${evento.evento}`);
      setEquipos(response.data.equipos);
      console.log(response.data.equipos);
      console.log(equipos); // Aquí puedes manejar la respuesta según tus necesidades
      // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al obtener IDs de equipos por evento:', error);
    }
  };
  
  // Obtener IDs de entrenadores por equipos
  const encontrarIdEntrenadoresPorEquipos = async () => {
    console.log(equipos); // Aquí puedes manejar la respuesta según tus necesidades

    try {
      const response = await axios.get(`./encontrarIdEntrenadoresPorEquipos`,equipos);
      const newEntre=response.data.entrenadores;
      setEntrenadores(newEntre)
      console.log(response.data.entrenadores); // Aquí puedes manejar la respuesta según tus necesidades
      console.log(entrenadores); // Aquí puedes manejar la respuesta según tus necesidades

    } catch (error) {
      console.error('Error al encontrar IDs de entrenadores por equipos:', error);
    }
  };
  
  // Obtener IDs de participantes por equipos
  const encontrarIdParticipantesPorEquipos = async () => {
    try {
      const response = await axios.get(`./encontrarIdPartcicipantesPorEquipos`,equipos);
      setParticipantes(response.data.idParticipantes)
      console.log(response.data.idParticipantes); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al encontrar IDs de participantes por equipos:', error);
    }
  };
  

  const obtenerIdsParticipantesPorEvento = async () => {
    try {
      const response = await axios.get(`./obtenerIdsParticipantesPorEvento/${evento.evento}`);
      setParticipantes(response.data.idParticipantes);
      console.log(response.data.idParticipantes); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al obtener IDs de participantes por evento:', error);
    }
  };


  const handleChangeAsunto = (e) => {
    const { name, value } = e.target;
            setErrorMensaje((error) => ({ ...error, asuntoError: validate.validarCampoVacio(asunto) }));
        setAsunto(value); 
  };
  const handleChangeMensaje = (e) => {
    const { name, value } = e.target;
    setErrorMensaje((error) => ({ ...error, mensajeError: validate.validarCampoVacio(mensaje) }));
    setMensaje(value);
  };
    const handleSubmit = async (e) => {
      if (!asunto.trim() || !mensaje.trim()) {
        setErrorMensaje((error) => ({ ...error, mensajeError: validate.validarCampoVacio(mensaje) }));
        setErrorMensaje((error) => ({ ...error, asuntoError: validate.validarCampoVacio(asunto) }));
        e.preventDefault();
      }else{    
        console.log('esta obteniendo mensajes por id');
        e.preventDefault();
        setErrorMensaje((error) => ({ ...error, mensajeError: ''}));
        setErrorMensaje((error) => ({ ...error, asuntoError: ''}));
        obtenerCorreosPorIds();
        try {
            const response = await axios.post('./enviar-correo', {
                destinatario,
                mensaje,
                asunto
            });

            console.log(response.data.mensaje);
        } catch (error) {
          setModalSNRegistroParticipantes(true);

            console.error('Error al enviar el mensaje', error);
        }
      }
    };

    return (
        <div>
        <br/>
          <h1 className="CrearEvento">Enviar Notificaciones </h1>
        <br/>
           <div className='formulario-notificaciones'>
           <br/>         
     <form onSubmit={handleSubmit}> 
     <div className='cont-input'>
        <label className="subtitulo required" htmlFor="asunto">Asunto:</label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          value={asunto}
          placeholder="Asunto de la notificación"
          onChange={handleChangeAsunto}
        />
         <p style={{ color: 'red' }}>{error.asuntoError}</p>
      </div>

      <div className='cont-input'>
        <label className="subtitulo required"  htmlFor="mensaje">Mensaje:</label>
        <input
          type="text"
          id="mensaje"
          name="mensaje"
          value={mensaje}
          placeholder="Escribe el mensaje aqui"
          onChange={handleChangeMensaje}
        />
         <p style={{ color: 'red' }}>{error.mensajeError}</p>
      </div>
<div className='boton-cont-NT'>
      <button className="blue-button-NT" type="submit">Enviar correo</button>
      </div>
            </form>
            {ModalSinRegistrosDeParticipantes && (
  <ModalError 
  message={'El registro esta vacio, aun no se ha registrado nadie al evento'}
  onClose={cerrarModalError}/>
)

}

        </div>
        </div>
    );
};

export default Enviarmensaje;
