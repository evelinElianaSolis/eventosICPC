import React, { useState, useEffect } from 'react';
import './assets/HomeVistaEvento.css';
import axios from '../components/api/conexionApi';
import { useNavigate, NavLink } from 'react-router-dom';




const VistaEditarEventos = () => {
  const EliminarEventoViwew = async (idEvento) => {
    try {
      console.log(idEvento);
      console.log('Eliminando evento...');
      await axios.delete(`http://localhost:8000/api/eliminarActividades/${idEvento}`);
      const req = await axios.delete(`http://localhost:8000/api/eventosdestroy/${idEvento}`);
      
      
      console.log(req);
      obtenerEventos();
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };




  
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
 






    const obtenerEventos = async () => {
      try {
        
        console.log('Fetching events...');
        const response = await axios.get('./eventosFuturos');        
        const data = response.data;
  
        // Check if the component is still mounted before setting state
                  // Check if data and eventosConProgramaGeneral are defined before setting state
          if (data && data.eventosConProgramaGeneral) {
            setEventos(data.eventosConProgramaGeneral);
            console.log('Events fetched successfully:', data);
          } else {
            console.error('Error: eventosConProgramaGeneral is undefined in the response data');
          }
        
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };
    

    obtenerEventos();
    
   
  }, []);
  
  

  const handleRegistrarseClick =  (eventoId) => {
    console.log("el id esss", eventoId);
    //window.location.href = `./VerInformacionEvento?id=${idEvento}`;
  // <NavLink to ={`/VerInformacionEvento/${idEvento}`}></NavLink>;   
   navigate(`/EditarEvento/${eventoId}`);  
  };

  return (
    <div className="cuerpo1">
      <h3 className="titulo_home">Lista de eventos</h3>
      <hr />

      <div className="eventos-container1">
        {eventos.map((eventoConProgramaGeneral) => (
          
          <div key={eventoConProgramaGeneral.evento.idEvento}
          
           className="evento-rectangulo1">
            
            <div className='evento-imagen'>
            <img src={eventoConProgramaGeneral.evento.aficheEvento} alt={`Evento ${eventoConProgramaGeneral.evento.idEvento}`} />
            </div>
            
            <div className="evento-info">
              
              <h4 className='evento-titulo'>{eventoConProgramaGeneral.evento.tituloEvento}  </h4>
  {eventoConProgramaGeneral.actividades.map((actividad, index) => (
                <div key={index} className='actividad-info'>
                  
                  <div className="fechas-cont">
                  <div className='mini-cont'><p><strong>Fecha de inicio: </strong> {actividad.fechaInicioActividad}</p></div>
                  <div  className='mini-cont'><p><strong >Fecha de fin: </strong> {actividad.fechaFinActividad}</p></div>
                </div>
                  
                </div>
              ))}
              <div className='to-padd'>
             <p><strong   className="fechas-cont" >Descripción: </strong></p> 
              {eventoConProgramaGeneral.evento.descripcionEvento && <p className='mini-cont2' > {eventoConProgramaGeneral.evento.descripcionEvento}</p>}
             </div>
             <p> <strong>Estado:</strong></p>
              <p className={`evento-rectangulo2 ${eventoConProgramaGeneral.evento.estadoEvento ? 'activo' : 'cancelado'}`}>  
                <strong>   {eventoConProgramaGeneral.evento.estadoEvento ? 'Activo' : 'Cancelado'}</strong></p>

              <div className='cancelarEvento'>
                <button className="masinfoCancelar" onClick={() => EliminarEventoViwew(`${eventoConProgramaGeneral.evento.idEvento}`) }>
                <img src="https://cdn-icons-png.flaticon.com/512/6722/6722986.png" className="iconoEliminar"/>
                Cancelar Evento
              </button>
              <button className="masinfoEditar" onClick={() => handleRegistrarseClick(`${eventoConProgramaGeneral.evento.idEvento}`)}>
                Editar Evento
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VistaEditarEventos;