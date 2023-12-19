// src/components/Enviarmensaje.js

import React, { useState } from 'react';
import axios from './api/conexionApi';
import ModalError from './ModalErrorRegistro';
import validate from './utils/Validaciones';
import './assets/Notificaciones.css'
import SuccessMessage from './ModalRegistroExitoso';

const Enviarmensaje = (evento, equipo) => {
    const [destinatario, setDestinatario] = useState(null);
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [saludo, setSaludo] = useState('Para confirmar ingrese este código');
    const [personas, setPersonas] = useState(null);
    const [participantes, setParticipantes] = useState(null);
    const [entrenadores, setEntrenadores] = useState(null);
    const [mensajes, setmensajes] = useState('');
    const [equipos, setEquipos] = useState(null);
    const [ModalSinRegistrosDeParticipantes, setModalSNRegistroParticipantes] = useState(false);
    const [errorAsunto, setErrorAsunto] = useState('');
    const [error, setErrorMensaje] = useState({
asuntoError:'',
mensajeError:''
    });
    
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const closeExitorModal = () => {

      setRegistroExitoso(false);
    };
    //f

const cerrarModalError=()=>{
setModalSNRegistroParticipantes(false);
}


    const obtenerCorreosPorIds = async () => {
      
        if(evento.equipo==='Grupal'){
          
            const NewEqui= await idEquiposPorEvento();
            setEquipos(NewEqui);
            if(!NewEqui || NewEqui.length===0){
              setmensajes('no hay equipos');
             //mostrar modal no existen equipos registrados
             setModalSNRegistroParticipantes(true);

            }else{
              const newEntren= await encontrarIdEntrenadoresPorEquipos();
             const newPartic= await encontrarIdParticipantesPorEquipos();
             setEntrenadores(newEntren);
             setParticipantes(newPartic);
              const todosLosUsuarios = [...newEntren, ...newPartic];
              //console.log("estos son todos los ids", todosLosUsuarios)
              try {                
                const response = await axios.post(`/obtenerCorreosPorIds`,{idPersona:todosLosUsuarios});
                setDestinatario(response.data.correos);
              //  console.log(response.data.correos); // Aquí puedes manejar la respuesta según tus necesidades
              //  console.log(destinatario); // Aquí puedes manejar la respuesta según tus necesidades

              } catch (error) {
                console.error('Error al obtener mensajes por IDs:', error);
              }
            }            
        }else{
          try{
          const varAux=await  obtenerIdsParticipantesPorEvento();
          setParticipantes(varAux);
             if(!varAux || varAux.length===0){
              //mostrar modal no existen equipos registrados
              setmensajes('no hay particip');
              //console.log({idPersona:participantes});

              setModalSNRegistroParticipantes(true);

             }else{
            try {
//console.log('participante es',participantes);
              //console.log('participante es idpersona',{idPersona:participantes});

                const response = await axios.post(`./obtenerCorreosPorIds`,{idPersona:varAux});
                setDestinatario(response.data.correos);

                //console.log(response.data.correos); // Aquí puedes manejar la respuesta según tus necesidades
              } catch (error) {
                console.error('Error al obtener mensajes por IDs:', error);
              }
            }
          }catch(error){
            console.error("error al obtner partiii",error);

          }
        }
       
      };


// Obtener IDs de equipos por evento
const idEquiposPorEvento = async () => {
    try {
      //console.log(evento.evento);
      const response = await axios.get(`./idEquiposPorEvento/${evento.evento}`);
      
      //console.log(response.data.equipos);
      //console.log(equipos); // Aquí puedes manejar la respuesta según tus necesidades
      // Aquí puedes manejar la respuesta según tus necesidades
      return response.data.equipos;
    } catch (error) {
      console.error('Error al obtener IDs de equipos por evento:', error);
      return null;
    }
  };
  
  // Obtener IDs de entrenadores por equipos
  const encontrarIdEntrenadoresPorEquipos = async () => {
   // console.log(equipos); // Aquí puedes manejar la respuesta según tus necesidades

    try {
      const response = await axios.post(`./encontrarIdEntrenadoresPorEquipos`,{equipos:equipos});
      const newEntre=response.data.entrenadores;
      //setEntrenadores(newEntre)
      console.log(response.data.entrenadores); // Aquí puedes manejar la respuesta según tus necesidades
      console.log(entrenadores); // Aquí puedes manejar la respuesta según tus necesidades
return response.data.entrenadores;
    } catch (error) {
      console.error('Error al encontrar IDs de entrenadores por equipos:', error);
      return null;
    }
  };
  
  // Obtener IDs de participantes por equipos
  const encontrarIdParticipantesPorEquipos = async () => {
    try {
      const response = await axios.post(`./encontrarIdParticipantesPorEquipos`,{equipos:equipos});
      setParticipantes(response.data.participantes)
    //  console.log(response.data.participantes); // Aquí puedes manejar la respuesta según tus necesidades
   return response.data.participantes;
    } catch (error) {
      console.error('Error al encontrar IDs de participantes por equipos:', error);
      return null;
    }
  };
  

  const obtenerIdsParticipantesPorEvento = async () => {
    try {
      const response = await axios.get(`./obtenerIdsParticipantesPorEvento/${evento.evento}`);
     // setParticipantes(response.data.participantes);
   //  console.log('sale aqui primero',response.data); // Aquí puedes manejar la respuesta según tus necesidades

     return response.data.participantes;
    } catch (error) {
      
      console.error('Error al obtener IDs de participantes por evento:', error);
      return null;
    }
  };


  const handleChangeAsunto = (e) => {
    const { name, value } = e.target;
            setErrorMensaje((error) => ({ ...error, asuntoError: validate.validarCampoVacio(value) }));
        setAsunto(value); 
  };
  const handleChangeMensaje = (e) => {
    const { name, value } = e.target;
    setErrorMensaje((error) => ({ ...error, mensajeError: validate.validarCampoVacio(value) }));
    setMensaje(value);
  };
    const handleSubmit = async(e) => {
      if (!asunto.trim() || !mensaje.trim()) {
        setErrorMensaje((error) => ({ ...error, mensajeError: validate.validarCampoVacio(mensaje) }));
        setErrorMensaje((error) => ({ ...error, asuntoError: validate.validarCampoVacio(asunto) }));
        e.preventDefault();
      }else{    
       // console.log('esta obteniendo mensajes por id');
        e.preventDefault();
        setErrorMensaje((error) => ({ ...error, mensajeError: ''}));
        setErrorMensaje((error) => ({ ...error, asuntoError: ''}));
        try{
        await obtenerCorreosPorIds();
        
        
           axios.post('./enviar-correo', {

                destinatario:destinatario,
                mensaje,
                asunto
            })
            .then((response) => {
              setmensajes('esta en envio de correo');

              setMensaje('');
              setAsunto(''); 

              setRegistroExitoso(true);
              console.log(response.data.mensaje);
            })
            .catch((error) => {
              setmensajes('no se pudo enviarr correo');

              setModalSNRegistroParticipantes(true);
              console.error('Error al enviar el mensaje', error);
            });
          }catch(error){
            console.error("error al enviar correo",error);
        
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
            {registroExitoso && (<SuccessMessage
     message="¡Notificación enviada!"
     onClose={closeExitorModal}/>)
    }
  {ModalSinRegistrosDeParticipantes && (
  <ModalError 
  //message={'El registro esta vacio, aun no se ha registrado nadie al evento'}
  message={mensajes}
  onClose={cerrarModalError}/>
)

}

        </div>
        </div>
    );
};

export default Enviarmensaje;
