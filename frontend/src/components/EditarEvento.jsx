import React, { useState, useEffect } from 'react';
import '../components/assets/EditarEvento.css';
import axios from './api/conexionApi';

const nombreActividadBuscada="Cronograma general";

const EditarEvento = (eventoId) => {
  const [eventoEditado, setEventoEditado] = useState({
    tituloEvento: '',
    participacion: '',
    numParticipantes: 0,
    numEntrenadores: 0,
    descripcionEvento: '',
    estadoEvento: '',
    aficheEvento: '',
    idTipoEvento: 0,
    idAdministrador: 0,
  });
  const [ActividadCronograma, setActividadCronograma] = useState({
    nombreActividad:"",
    descripcionActividad:"",
    modalidad:"",
    fechaInicioActividad:"",
    fechaFinActividad:"",
    horaInicioActividad:"",
    ubicacionActividad:"",
  })
  const [ActividadEditado, setActividadEditado] = useState([{
    nombreActividad:"",
    descripcionActividad:"",
    modalidad:"",
    fechaInicioActividad:"",
    fechaFinActividad:"",
    horaInicioActividad:"",
    ubicacionActividad:"",
  },
]);
  const [Requisitos, setRequisitos] = useState([{
    nombreRequisito:"",
    descripcionRequisito:""
      
  },
]);
  
  const [Reglas, setReglas] = useState([{
    nombreRegla:"",
    descripcionRegla:""
  },
]);
   
  useEffect(() => {
    console.log("el id es: ", eventoId.eventoId);
  
    const obtenerInformacion = async () => {
      try {
        const responseEvento = await axios.get(`eventos/${eventoId.eventoId}`);
        setEventoEditado(responseEvento.data.evento);
        console.log("el eventoEditado es: ", responseEvento.data.evento);
  
        // Esperar 1 segundo antes de la siguiente solicitud
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const responseActividad = await axios.get(
          `buscarActividadPorNombre/${eventoId.eventoId}/${encodeURIComponent(nombreActividadBuscada)}`
        );
        setActividadCronograma(responseActividad.data.actividadPorNombre[0]);
  
        // Esperar 1 segundo antes de la siguiente solicitud
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const responseReglas = await axios.get(`obtenerReglasDeEvento/${eventoId.eventoId}`);
        setReglas(responseReglas.data.reglas);
        console.log("reglas es: ", responseReglas.data.evento);
  
        // Esperar 1 segundo antes de la siguiente solicitud
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const responseRequisitos = await axios.get(`obtenerRequisitosDeEvento/${eventoId.eventoId}`);
        setRequisitos(responseRequisitos.data.requisitos);
  
        // Esperar 1 segundo antes de la siguiente solicitud
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const responseActividades = await axios.get(`ActividadesSinCronGral/${eventoId.eventoId}`);
        setActividadEditado(responseActividades.data.actividades);
      } catch (error) {
        console.error('Error al obtener información', error);
      }
    };
  
    obtenerInformacion();
  }, []); // La dependencia vacía garantiza que este efecto se ejecute solo en el montaje y desmontaje del componente
  
  

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEventoEditado({
      ...eventoEditado,
      [name]: value,
    });
  };
    const handleInputChangeReglas = (e, index) => {
    const { name, value } = e.target;
    const newReglas = [...Reglas];
    newReglas[index] = { ...newReglas[index], [name]: value };
    setReglas(newReglas);
  };
  const handleInputChangeRequisitos = (e, index) => {
    const { name, value } = e.target;
    const newRequisitos = [...Requisitos];
    newRequisitos[index] = { ...newRequisitos[index], [name]: value };
    setRequisitos(newRequisitos);
  };
  const handleInputChangeActividad = (e, index) => {
    const { name, value } = e.target;
    const newActividadEditado = [...ActividadEditado];
    newActividadEditado[index] = { ...newActividadEditado[index], [name]: value };
    setActividadEditado(newActividadEditado);
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Hacer una solicitud para actualizar la información del eventoEditado
    axios.put(`./eventoActualizar/${eventoId.eventoId}`, eventoEditado)
      .then(response => {
        console.log('Evento actualizado con éxito', response.data.evento);
        // Puedes redirigir al usuario a la página del eventoEditado o realizar otras acciones después de la actualización
      })
      .catch(error => {
        console.error('Error al actualizar el eventoEditado', error);
      });
  };
    return (
    <div>
      <h2 className="CrearEvento">Editar Evento</h2>
      <form onSubmit={handleSubmit} className="tweet-composer">
      <div className="PrimeraFila">
      <div className="TituloEvento">
      <div className='Campovacio'>
        <label>Título del Evento:</label>
        <div className="ColorCampoVacio">*</div>
        </div>
          <input type="text" 
          name="tituloEvento" 
          value={eventoEditado.tituloEvento} 
          onChange={handleInputChange} />
        </div>
        <div className="horaEvento">
        <div className="Campovacio">
          <label htmlFor="horaEvento">Hora de inicio</label>
          <div className="ColorCampoVacio">*</div>
        </div>
        <input
          type="time"
          id="horaEvento"
          name="horaInicioActividad"
          value={ActividadCronograma.horaInicioActividad} 
          onChange={handleInputChange}
          required
        />
      </div>
      </div>
    

      <div className="Fecha">
        <div className="FechaInicio">
          <div className="Campovacio">
            <label htmlFor="fecha-inicio">Fecha inicio:</label>
            <div className="ColorCampoVacio">*</div>
          </div>
          <input
            className={"FechaDesing"}
            type="date"
            id="fecha-inicio"
            name="fechaInicioActividad"
            value={ActividadCronograma.fechaInicioActividad}
            onChange={handleInputChange}
            required
          />

        </div>
        <div className="FechaFinal">
          <div className="Campovacio">
            <label htmlFor="fecha-fin">Fecha fin:</label>
            <div className="ColorCampoVacio">*</div>
          </div>         
          <input
            className="FechaDesing"
            type="date"
            id="fecha-fin"
            name="fechaFinActividad"
            value={ActividadCronograma.fechaFinActividad}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>


      <div className="SegundaFila">

<div className="composer-form">
    <div className="Ubicacion">
      <div className='Campovacio'>
        <label htmlFor="ubicacion">Ubicación:</label>
        <div className="ColorCampoVacio">*</div>
      </div>
        <input
          type="text"
          id="ubicacion"
          name="ubicacionActividad"
          placeholder="Ubicación"
          value={ActividadCronograma.ubicacionActividad} 
          onChange={handleInputChange}
          required
          
        />
    </div>
    </div>

    <div className="Modalidad">
    <div className='Campovacio'>
    <label htmlFor="modalidad">Modalidad: </label>
    <div className="ColorCampoVacio">*</div>
    </div>
    <select
    id="modalidad"
    name="modalidad"
    value={ActividadCronograma.modalidad} 
    onChange={handleInputChange}
    required
    >
    <option value=" ">-- seleccione --</option>
    <option value="Virtual">Virtual</option>
    <option value="Presencial">Presencial</option>
    <option value="Hibrida">Hibrida</option>
    </select>
    </div>
    </div>



    <div className="Campovacio">
        <label htmlFor="descripcion">Descripción</label>
        <div className="ColorCampoVacio">*</div>
      </div>
      <textarea
        id="descripcion"
        name="descripcionActividad"
        placeholder="Descripcion del evento"
        rows="4"
        value={ActividadCronograma.descripcionActividad} 
        onChange={handleInputChange}
        required
      >
        
      </textarea>





        <label>Participacion:
          <input type="text" 
          name="participacion" 
          value={eventoEditado.participacion} 
          onChange={handleInputChange} />
        </label>

        <label>Estado Evento:
          <input type="text" 
          name="estadoEvento" 
          value={eventoEditado.estadoEvento} 
          onChange={handleInputChange} />
        </label>

        <label>Numero de Entrenadores:
          <input type="text" 
          name="numEntrenadores" 
          value={eventoEditado.numEntrenadores} 
          onChange={handleInputChange} />
        </label>

        <label>Numero Participantes:
          <input type="text" 
          name="numParticipantes" 
          value={eventoEditado.numParticipantes} 
          onChange={handleInputChange} />
        </label>

        <label>Tipo de evento:
          <input type="text" 
          name="idTipoEvento" 
          value={eventoEditado.idTipoEvento} 
          onChange={handleInputChange} />
         </label>

         {ActividadEditado[0].nombreActividad !=="" && (
  <div>
    <h2>Actividades del Evento</h2>
    <ul>
      {ActividadEditado.map((actividad, index) => (
        <li key={index}>
          <div>
            <label>
              Nombre de la Actividad:
              <input
                type="text"
                name="nombreActividad"
                value={actividad.nombreActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          <div>
            <label>
              Fecha inicio de la actividad:
              <input
                type="text"
                name="fechaInicioActividad"
                value={actividad.fechaInicioActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          <div>
            <label>
              Hora inicio de la Actividad:
              <input
                type="text"
                name="horaInicioActividad"
                value={actividad.horaInicioActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>

          <div>
            <label>
              Ubicacion de la Actividad:
              <input
                type="text"
                name="ubicacionActividad"
                value={actividad.ubicacionActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          <div>
          <label>
             Modalidad de la actividad:
              <input
                type="text"
                name="modalidad"
                value={actividad.modalidad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>

          {actividad.nombreActividad !=="" && (

          <div>
          <label>
          Descripcion de la actividad:
              <input
                type="text"
                name="descripcionActividad"
                value={actividad.descripcionActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          )}
          <br />

          <div>
            <label>
              Fecha fin de la actividad:
              <input
                type="text"
                name="fechaFinActividad"
                value={actividad.fechaFinActividad} 
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          <br />
        </li>
      ))}
    </ul>
  </div>
)}

{Reglas[0].nombreRegla!=="" && (
  <div>
         <h2>Reglas del Evento</h2>
        <ul>
        {Reglas.map((regla, index) => (
  <li key={index}>
    <div>
      <label>
        Nombre de la Regla:
        <input
          type="text"
          name="nombreRegla"
          value={regla.nombreRegla}
          onChange={(e) => handleInputChangeReglas(e, index)}
        />
      </label>
    </div>

    {regla.descripcionRegla!=="" && (
      <div>
      <label>
        Descripción de la Regla:
        <input
          type="text"
          name="descripcionRegla"
          value={regla.descripcionRegla}
          onChange={(e) => handleInputChangeReglas(e, index)}
        />
      </label>
    </div>)}
    <br />
  </li>
))}       
 </ul>
   </div>
)}
     
     {Requisitos[0].nombreRequisito!== "" && (
  <div>
        <h2>Requisitos del Evento</h2>
        <ul>
        {Requisitos.map((requisito, index) => (
  <li key={index}>
    <div>
      <label>
        Nombre de la Requisito:
        <input
          type="text"
          name="nombreRequisito"
          value={requisito.nombreRequisito}
          onChange={(e) => handleInputChangeRequisitos(e, index)}
        />
      </label>
    </div>
    {requisito.descripcionRequisito!== "" && (
     <div>
      <label>
        Descripción de la Requisito:
        <input
          type="text"
          name="descripcionRequisito"
          value={requisito.descripcionRequisito}
          onChange={(e) => handleInputChangeRequisitos(e, index)}
        />
      </label>
    </div>)}
    <br />
    
  </li>
))}
        </ul> 
         </div>
)}
     
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarEvento;
