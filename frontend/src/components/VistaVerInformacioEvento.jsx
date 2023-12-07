
import React, { useState, useEffect } from 'react';
import axios from './api/conexionApi';
import './assets/VerInformacionEvento.css'
import ModalParaRegistro from './ModalSeleccionarRegistro';
import './assets/Titulo.css'
import 'react-calendar/dist/Calendar.css'; // Importar estilos CSS
import CalendarioDesplegable from './CalendarioDesplegable';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//const EventoId=2;

const varEquipo = 'Grupal';
const EventoComponent = (EventoId) => {
    const navigate = useNavigate();
//------------------
//modal de seleccion
const [showSeleccionModal, setShowSeleccionModal] = useState(false);

  const closeSeleccionModal = () => {
    setShowSeleccionModal(false);
  };

  const handleModalSeleccion = () => {
    if(evento.participacion==="Grupal"){
        setShowSeleccionModal(true);
    }else{

       // window.location.href = `./RegistroParticipantes?${EventoId}`;
       //window.location.href =`/RegistroParticipantes/${EventoId.EventoId}`;
       <NavLink to={`/RegistroParticipantes/${EventoId.EventoId}`}></NavLink>

    }
    
  };
//--------------------------------------------------------------------------


    //tabla evento------------------------------------------------------------
   
    const [evento, setEvento] = useState(null);

    useEffect(() => {
      const obtenerEvento = async () => {
        try {
          const response = await axios.get(`eventos/${EventoId.EventoId}`);
          setEvento(response.data.evento);
        } catch (error) {
          console.error('Error al obtener el evento:', error);
        }
      };
    
      obtenerEvento();
    }, [EventoId.EventoId]); // Agrega EventoId.EventoId como dependencia
    

    //tabla regla
            const [reglas, setReglas] = useState([]);
            useEffect(() => {
              const obtenerReglas = async () => {
                try {
                  const response = await axios.get(`obtenerReglasDeEvento/${EventoId.EventoId}`);
                  setReglas(response.data.reglas);
                } catch (error) {
                  console.error('Error al obtener las reglas:', error);
                }
              };
            
              obtenerReglas();
            }, [EventoId.EventoId]);
            

        //tabla requisito
        const [requisitos, setRequisitos] = useState([]);
          useEffect(() => {
  const obtenerRequisitos = async () => {
    try {
      const response = await axios.get(`obtenerRequisitosDeEvento/${EventoId.EventoId}`);
      setRequisitos(response.data.requisitos);
    } catch (error) {
      console.error('Error al obtener los requisitos:', error);
    }
  };

  obtenerRequisitos();
}, [EventoId.EventoId]); // Asegúrate de incluir todas las dependencias necesarias


           

             
              
             
              
    if (!evento ) {
        return <div>Cargando evento...</div>;
    };
    

    return (
        <div className="all-info-container">
                  <h3 className="titulo_home">Información del Evento:</h3>

                <h1 className='titulo-1'>{evento.tituloEvento}</h1>
                <hr />
            <br />

        
            <div className='date-container'>
            
                    <div className='date-box'>
                    <strong>Estado:</strong>
                    <p className={`info-box ${evento.estadoEvento ? 'estado-activo' : 'estado-inactivo'}`}><strong>{evento.estadoEvento ? 'Activo' : 'Inactivo'}</strong></p>
                    </div>
            </div>
                    <div className='date-container'>
                    <div className='date-box'> 
                    <br />
                    
                    
                    <CalendarioDesplegable EventoId={`${EventoId.EventoId}`}  />
                    </div>
                    </div>
                 
                    
            
        
            <br />
            

            
            <div className='date-box'>
                <strong>Participacion:</strong>  
                <p className='info-box'> {evento.participacion}</p>
        <br />

                {evento.participacion === varEquipo  && (

                <div className='date-container'>
                    <>  

                    <div className='date-box'>
                        <strong>Cantidad de entrenadores por equipo:</strong>
                        <p className='info-box'> {evento.numEntrenadores}</p>
                    </div>
                    
                    <div className='date-box'>
                        <strong>Cantidad de participantes por equipo:</strong>
                        <p className='info-box'> {evento.numParticipantes}</p>
                    </div>
                </>
                </div>
            )}

             {evento.participacion === 'Individual' && (
        
            <div >
            
            </div>
                )}
            </div>

        {reglas.length === 0 ? (
  <div className='info-box'>
    <strong>Sin reglas</strong>
  </div>
) : (
  <div className='info-box'>
    <strong>Reglas</strong>
    <ol>
      {reglas.map((regla, index) => (
        <li key={index}>
          <strong>{regla.nombreRegla}</strong>
          <p></p>
          {regla.descripcionRegla !== null && (
          <div>
            <strong>Descripción:</strong>
            <p>{regla.descripcionRegla}</p>
          </div>
)}
        </li>
      ))}
    </ol>
  </div>
)}
<br/>
{requisitos.length === 0 ? (
  <div className='info-box'>
    <strong>Sin requisitos</strong>
  </div>
) : (
  <div className='info-box'>
    <strong>Requisitos</strong>
    <ol>
      {requisitos.map((requisito, index) => (
        <li key={index}>
          <strong>{requisito.nombreRequisito}</strong>
          <p></p>
          {requisito.descripcionRequisito !== null && (
  <div>
    <strong>Descripción:</strong>
    <p>{requisito.descripcionRequisito}</p>
  </div>
)}
        </li>
      ))}
    </ol>
  </div>
)}
         



            <div className="button-container-RI">  

            <button className="blue-button-RI" onClick={() => navigate('/Home')}>Volver Atrás</button>
                
            </div>

       
            {showSeleccionModal && (
        <ModalParaRegistro EventoId={`${EventoId.EventoId}`} onClose={closeSeleccionModal} />
      )}

        </div>
        
    );
    
}



export default EventoComponent;
