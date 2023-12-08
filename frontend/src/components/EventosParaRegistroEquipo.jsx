import React, { useState, useEffect } from 'react';
import './assets/HomeVistaEvento.css';
import axios from '../components/api/conexionApi';
import { useNavigate, NavLink } from 'react-router-dom';
const HomeVistaEvento = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted
  
    console.log('Component is mounting');
  
    const obtenerEventos = async () => {
      try {
        console.log('Fetching events...');
        const response = await axios.get('./eventosConActividadGrupal');
        
        const data = response.data;
  
        // Check if the component is still mounted before setting state
        if (isMounted) {
          // Check if data and eventosConActividadGrupal are defined before setting state
          if (data && data.eventosConActividadGrupal) {
            setEventos(data.eventosConActividadGrupal);
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

  const ultimoEquipo = () => {
    axios.get(`obtenerUltimoIdEquipo`)
      .then(response => {
        if (response.data.idEquipo) {
          const newIdEquipo = response.data.idEquipo + 1;
          console.log("new id equipo", newIdEquipo);
          setVarIdEquipo(newIdEquipo);
          console.log("el id equipo", varIdEquipo);
        } else {
          setVarIdEquipo(1);
        }
      })
      .catch(error => {
        console.error('Error al recuperar id del último equipo:', error);
        setVarIdEquipo(1);
      });
  };
  useEffect(() => {
    ultimoEquipo();
  }, []); 

  const handleRegistrarseClick =  (idEvento, numEntre, numParti) => {
    console.log("el id evento", idEvento);

    //window.location.href = `./VerInformacionEvento?id=${idEvento}`;
   //<NavLink to ={`/RegistroParticipanteToEquipo/${idEvento}`}></NavLink>;
   
   console.log("el id equipo", varIdEquipo);
   navigate(`/RegistrarEquipoOp2/${idEvento}/${varIdEquipo}/${numEntre}/${numParti}`);
  
  };

  return (
    <div className="cuerpo">
      <h3 className="titulo_home">Eventos con participacion grupal en curso</h3>
      <hr />

      <div className="eventos-container">
        {eventos.map((eventoConProgramaGeneral) => (
          <div key={eventoConProgramaGeneral.evento.idEvento}
           className="evento-rectangulo">
            <div className='evento-imagen'>
            <img src={eventoConProgramaGeneral.evento.aficheEvento} alt={`Evento ${eventoConProgramaGeneral.evento.idEvento}`} />
            </div>
            <div className="evento-info">
              <h4 className='evento-titulo'>{eventoConProgramaGeneral.evento.tituloEvento}</h4>
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

              <button className="masinfo" onClick={() => handleRegistrarseClick(`${eventoConProgramaGeneral.evento.idEvento}` , `${eventoConProgramaGeneral.evento.numEntrenadores}`,`${eventoConProgramaGeneral.evento.numParticipantes}`)}>
                Registrar Equipo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeVistaEvento;
