import React, { useState, useEffect } from 'react';
import axios from './api/conexionApi';
import { useNavigate, NavLink } from 'react-router-dom';
const EventosNotificar = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted
  
    console.log('Component is mounting');
  
    const obtenerEventos = async () => {
      try {
        console.log('Fetching events...');
        const response = await axios.get('./eventosFuturos');        
        
        const data = response.data;
  
        // Check if the component is still mounted before setting state
        if (isMounted) {
          // Check if data and eventosConActividadGrupal are defined before setting state
          if (data && data.eventosConProgramaGeneral) {
            setEventos(data.eventosConProgramaGeneral);
            console.log('Events fetched successfully:', data);
          } else {
            console.error('Error: eventosConActividadGrupal is undefined in the response data');
          }
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };
  
    obtenerEventos();
  
    // Specify a cleanup function
    return () => {
      console.log('Component is unmounting');
      isMounted = false; // Set the flag to false when the component is unmounted
      setEventos([]); // Reset events when the component unmounts
    };
  }, []);
  
  //====================================================================
  const [varIdEquipo, setVarIdEquipo] = useState(null);

 

  const handleRegistrarseClick =  (idEvento,equipo) => {
    console.log("el id evento", idEvento);

    //window.location.href = `./VerInformacionEvento?id=${idEvento}`;
   //<NavLink to ={`/RegistroParticipanteToEquipo/${idEvento}`}></NavLink>;
   
   console.log("el id equipo", varIdEquipo);
   navigate(`/EnviarNotificaciones/${idEvento}/${equipo}`);
  
  };

  return (
    <div className="cuerpo">
      <h3 className="titulo_home">Eventos con participacion grupal en curso</h3>
      <hr />

      <div className="eventos-container">
        {eventos.map((eventosConProgramaGeneral) => (
          <div key={eventosConProgramaGeneral.evento.idEvento}
           className="evento-rectangulo">
            <div className='evento-imagen'>
            <img src={eventosConProgramaGeneral.evento.aficheEvento} alt={`Evento ${eventosConProgramaGeneral.evento.idEvento}`} />
            </div>
            <div className="evento-info">
              <h4 className='evento-titulo'>{eventosConProgramaGeneral.evento.tituloEvento}</h4>
  {eventosConProgramaGeneral.actividades.map((actividad, index) => (
                <div key={index} className='actividad-info'>
                  
                  <div className="fechas-cont">
                  <div className='mini-cont'><p><strong>Fecha de inicio: </strong> {actividad.fechaInicioActividad}</p></div>
                  <div  className='mini-cont'><p><strong >Fecha de fin: </strong> {actividad.fechaFinActividad}</p></div>
                </div>
                  
                </div>
              ))}
              <div className='to-padd'>
             <p><strong   className="fechas-cont" >Descripción: </strong></p> 
              {eventosConProgramaGeneral.evento.descripcionEvento && <p className='mini-cont2' > {eventosConProgramaGeneral.evento.descripcionEvento}</p>}
             </div>
             <p> <strong>Estado:</strong></p>
              <p className={`evento-rectangulo2 ${eventosConProgramaGeneral.evento.estadoEvento ? 'activo' : 'cancelado'}`}>  
                <strong>   {eventosConProgramaGeneral.evento.estadoEvento ? 'Activo' : 'Cancelado'}</strong></p>

              <button className="masinfo" onClick={() => handleRegistrarseClick(`${eventosConProgramaGeneral.evento.idEvento}`,`${eventosConProgramaGeneral.evento.participacion}` )}>
                Enviar notificación
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventosNotificar;