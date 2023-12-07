import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../components/assets/MyCalendar.css';
import axios from './api/conexionApi';
import ModalEvento from '../components/ModalEvento';
import '../components/assets/VerInformacionEvento.css'


//const EventoId=3;

const nombreActividadBuscada = 'Cronograma general';

const localizer = momentLocalizer(moment);




const MiCalendario = ({ EventoId}) => {

//

const [modalAbierto, setModalAbierto] = useState(false);
const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
const mostrarDatosEvento = (evento) => {   
    setEventoSeleccionado(evento);
    setModalAbierto(true);
 
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
  };



console.log("1    ",EventoId)

//
const [actividadEncontrada, setActividadEncontrada] = useState(null);

useEffect(() => {
  axios.get(`buscarActividadPorNombre/${EventoId}/${encodeURIComponent(nombreActividadBuscada)}`)
    .then(response => {
      const actividad = response.data.actividadPorNombre[0];
      if (actividad) {
        setActividadEncontrada(actividad);
        console.log('Respuesta del servidor:', actividad);
      } else {
        console.log('No se encontró ninguna actividad con el nombre \'Cronograma general\'');
      }
    })
    .catch(error => {
      console.error('Error al obtener la actividad cronograma', error);
    });
}, [EventoId]);
 
 //tabla actividad
 const [actividades, setActividades] = useState([]);

useEffect(() => {
  axios.get(`obtenerActividadesDeEvento/${EventoId}`)
    .then(response => {
      if (response.data && response.data.actividades) {
        setActividades(response.data.actividades);
      }
    })
    .catch(error => {
      console.error('Error al obtener las actividades:', error);
    });
}, [EventoId]);



   
    
//const eventosConColores = asignarColoresAleatorios(eventos);

const [eventosConColores, setEventosConColores] = useState([]);

  useEffect(() => {
    if (actividades && actividades.length > 0) {
        // Accede a la propiedad 0 de actividades aquí
      
    const eventosColoreados = asignarColoresAleatorios(actividades);
      setEventosConColores(eventosColoreados);    
      console.log("evento con color es ",eventosColoreados)
    } else {
        console.log("No hay actividades disponibles");
      }
  }, [actividades]);

  

 

  const dayStyleGetter = (date) => {

        const hasEvents = eventosConColores.some(evento => { 
              
            const eventFecIni=new Date(evento.fechaInicioActividad + "T23:59:59Z") 
            const eventFecFin=new Date(evento.fechaFinActividad + "T23:59:59Z")
            const eventStartDate = new Date(eventFecIni.getFullYear(),eventFecIni.getMonth(),eventFecIni.getDate());
            const eventEndDate = new Date(eventFecFin.getFullYear(),eventFecFin.getMonth(),eventFecFin.getDate());
            const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());            
        console.log("A date  start es ",eventStartDate) 
        console.log("A date  end es ",eventEndDate) 
       console.log("A date ajuste ",adjustedDate) 
        //return date >= eventStartDate && date <= eventEndDate;
        
    return adjustedDate >= eventStartDate && adjustedDate <= eventEndDate;
        
      });

    return hasEvents ? { style: { backgroundColor: '#37c7e0' } } : {};
  };

  if (!actividadEncontrada || !eventosConColores) {
    return <div>Ha ocurrido un error al cargar los datos</div>;
  }

  const fechaInicio = actividadEncontrada ? new Date(actividadEncontrada.fechaInicioActividad + "T00:00:00") : null;


  //  const fechaInicio = new Date(actividadEncontrada.fechaInicioActividad) ;
  
//console.log("fecha inicio ",fechaInicio)

const eventosFiltrados = eventosConColores.filter(evento => evento.nombreActividad !== nombreActividadBuscada);
console.log("eventos fistrados ",eventosFiltrados.length)

if(eventosFiltrados.length===0){

    return (
   
        <div >
             {actividadEncontrada.descripcionActividad!==null && (
                    <div className='date-box'>
                <strong>Descripcion del Evento:</strong>
                <p className='info-box'>{actividadEncontrada.descripcionActividad }</p>
                </div>
                )}
            <div className='date-container'>
           
                <div className='date-box'>
                <strong>Fecha Inicio Evento:</strong>
                <p className='info-box-color '> {actividadEncontrada.fechaInicioActividad}</p>
                </div>
    
                <div className='date-box'>
                <strong>Fecha fin Evento:</strong>
                <p className='info-box-color'>{actividadEncontrada.fechaFinActividad }</p>
                </div>
                
             </div>
             <br />
             <div className='date-container'>
            
                <div className='date-box'>
                <strong>Hora Inicio del Evento:</strong>
                <p className='info-box '> {actividadEncontrada.horaInicioActividad}</p>
                </div>
    
                <div className='date-box'>
                <strong>Modalidad del Evento:</strong>
                <p className='info-box'>{actividadEncontrada.modalidad }</p>
                </div>
                
             </div>
             <br />
             <div className='date-container'>   
                <div className='date-box'>
                <strong>Ubicacion del Evento:</strong>
                <p className='info-box'>{actividadEncontrada.ubicacionActividad }</p>
                </div>
                
             </div>
        <br />

        <br />
    <div className='date-container'>
                    <h3>Calendario del evento</h3>
                    </div>
                    <br />
        
       <div className='space-cal'>
      
          <Calendar 
    
            localizer={localizer}
            startAccessor="fechaInicioActividad"
            endAccessor="fechaFinActividad"
            className="mi-calendario"            
            views={['month', 'agenda']}
            toolbar={true}            
            dayPropGetter={(date) => {             
              const eventStyle = dayStyleGetter(date).style;
              return { style: {  ...eventStyle } };
            }}
            
            
            
            defaultDate={fechaInicio}
            
            defaultView="month"
            
            />
         </div>
          
       
        </div>
      );
    

}else{
  return (
   
    <div >
       
                
                {actividadEncontrada.descripcionActividad!==null && (
                    <div className='date-box'>
                <strong>Descripcion del Evento:</strong>
                <p className='info-box'>{actividadEncontrada.descripcionActividad }</p>
                </div>
                )}
                
        <div className='date-container'>
        
            <div className='date-box'>
            <strong>Fecha Inicio Evento:</strong>
            <p className='info-box-color '> {actividadEncontrada.fechaInicioActividad}</p>
            </div>

            <div className='date-box'>
            <strong>Fecha fin Evento:</strong>
            <p className='info-box-color'>{actividadEncontrada.fechaFinActividad }</p>
            </div>
            
         </div>
    <br />
    <br />
    <div className='date-container'>
                    <h3>Calendario de actividades</h3>
                    </div>
                    <br />

    <div className='date-container'>
    
      <Calendar 

        localizer={localizer}
        
        events={eventosFiltrados}
        
        startAccessor="fechaInicioActividad"
        endAccessor="fechaFinActividad"
        className="mi-calendario"
        
        views={['month', 'agenda']}
        toolbar={true}
        
        eventPropGetter={(event, start, end, isSelected) => {
          
           return {
            style: {
              
             backgroundColor: event.color, // Usa el color asignado al evento
           },
          };
        }}
        //eventPropGetter={eventStyleGetter}
        dayPropGetter={(date) => {
         
          const eventStyle = dayStyleGetter(date).style;
          return { style: {  ...eventStyle } };
        }}
        
        
        
        defaultDate={fechaInicio}
        
        defaultView="month"
        components={{
            event: EventoConNombre // Usa un componente personalizado para mostrar los eventos
          }}
          
          onSelectEvent={mostrarDatosEvento}
      />
       {modalAbierto && eventoSeleccionado &&
        <ModalEvento evento={eventoSeleccionado} color={eventoSeleccionado.color} onClose={cerrarModal} />
      }
     
     </div>
    </div>
  );
};
}



      
const EventoConNombre = ({ event }) => (
    <div>
      <div style={{ fontWeight: 'bold' }}>{event.title}</div>
      <div>{event.horaInicioActividad} </div>
      <div>{event.nombreActividad}</div> 
    </div>
  );
const asignarColoresAleatorios = (eventos) => {
    return eventos.map(evento => ({
      ...evento,
      color: getRandomColor(),
    }));
  };
const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Tonos de 0 a 360
  const pastelSaturation = Math.floor(Math.random() * 20) + 70; // Saturación entre 70 y 90 para pasteles
  const pastelLightness = Math.floor(Math.random() * 20) + 70; // Brillo entre 70 y 90 para pasteles

  return `hsl(${hue}, ${pastelSaturation}%, ${pastelLightness}%)`;

  };
  

export default MiCalendario;
