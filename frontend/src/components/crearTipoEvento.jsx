import React, { useState } from 'react';
import axios from './api/conexionApi';
import '../components/assets/crearTipoEvento.css';
import Alert from './Alert';
import ModalSalir from './ModalCancelarTipoE';
import ModalTipo from './ModalRegistrarTipoE';
import Ops from './modalOpss';
const EventForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreError, setNombreError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [Error, setError] = useState(false);
  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);
  const [mostrarModalTipo, setMostrarModalTipo] = useState(false);
  const [mostrarModalOpsEvento,   setMostrarModalOpsEvento] =   useState(false);
 // const [Bandera,   setBandera] =   useState(false);
 const handleOpsEvento               = () => {setMostrarModalOpsEvento(false);};
  const handleInicioClick = () => {setMostrarModalSalir(true);};  
  const handleInicioTipo = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handleSubmit(e); // Pass the event object to handleSubmit
  };


  const handleButtonCancelarCE = () => {  setMostrarModalSalir(false);  };
  const handleButtonCancelarTI = () => {  setMostrarModalTipo(false);  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    setNombreError('');
  };
 
  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    setDescripcionError('');
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!nombre) {
      setNombreError('El nombre es obligatorio.');
      return;
    }

    if (nombre.length > 25) {
       setNombreError('El campo de nombre no debe exceder los 25 caracteres.');
      return;
    }
    

    if (!/^[A-Za-z\s]+$/.test(nombre)) {
      setNombreError('El nombre no debe contener números ni caracteres especiales.');
      return;
    }
    const nombExist = await axios.get(`./verificarNombreExistente/${nombre}`);
    console.log(nombExist.data.existeNombre);
    const formData = new FormData();
    //formData.append('titulo', titulo);
    formData.append('nombreTipoEvento', nombre);
    formData.append('descripcionTipoEvento', descripcion);

    try {
      if(nombExist.data.existeNombre == false){
      // Realizar la solicitud POST con formData usando axios
      await axios.post('crearTipoEvento', formData);
      setMostrarModalTipo(true);
      setModalVisible(true);
      console.log('Evento creado con éxito');
      
      setNombre('');
      setDescripcion('');
     }else{
      if(nombExist.data.existeNombre){
        setMostrarModalOpsEvento(true)
      }
     }
    } catch (error) {
      console.error('Error al crear evento', error);
      setModalVisible(false);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-composer">
      <h1 className="CrearEvento">CREAR TIPO DE EVENTO</h1>
      <div className="composer-form">

    
      
        <label htmlFor="nombre">Nombre <span style={{ color: 'red' }}>*</span></label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Nombre del tipo de evento"
        value={nombre}
        onChange={handleNombreChange}
        onBlur={() => (setNombreError(nombre.trim() === ""), setError(nombre.trim() === ""))}
        className={nombreError ? "campo-vacio" : ""}
        
      />
      {(Error && <Alert/>)}

<div className="error-message">{nombreError}</div>
        
<br></br>

        <label htmlFor="Descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción del evento"
          rows="4"
          value={descripcion}
          onChange={handleDescripcionChange}
        ></textarea>

        <p className="error-message">{descripcionError}</p> {/* Nuevo */}


        

  

<div className="container">
        <div className="CreadoExitosamente">
          
        </div>
       <div className='tipoeventob'>
         <button className="tweet-button" type="submit" onClick={handleInicioClick}>
            Cancelar
          </button>
        
          <button className="tweet-button" type="submit" onClick={handleInicioTipo}>
            Crear
          </button>
        </div> 
        </div>
      </div>
      {mostrarModalSalir && (
        <ModalSalir message="Cancelar creación" onClose={handleButtonCancelarCE} />
        
      )}

    {mostrarModalTipo && (
        <ModalTipo message="Creación del tipo de evento" onClose={handleButtonCancelarTI} />
        
      )}
      {mostrarModalOpsEvento && 
         <Ops message="Opss el evento ya existe " onClose={handleOpsEvento}/>
        }
    </form>
  );
};

export default EventForm;