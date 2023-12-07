// Componente de validaciones
const errorCaracteresNoPermitidos='Esta intentando ingresar un caracter no permitido';
const errorOchoCaracteres='Lo lamento no puede ingresar mas caracteres';
//const errorTreintaCaracteres='Este campo solo admite estos 30 caracteres';
const errorTreintaCaracteres='Lo lamento no puede ingresar mas caracteres';

//const errorSesentaCaracteres='Este campo no puede superar los 60 caracteres';
const errorSesentaCaracteres='Lo lamento no puede ingresar mas caracteres';

const errorSieteCaracteres='Este campo no puede ser menor a los 7 caracteres';
const errorSoloNumeros='Solo se permiten caracteres numéricos';
const errorSeleccioneUnaOpcion='Seleccione al menos una opción';
const errorCorreo='Ingrese un correo válido en el formato example@dominio.com';
const errorCorreoCar='Los caracteres espeviales que intenta ingresar son invalidos';
const errorMinOchoCaracteres = 'Este campo no puede ser menor a los 8 caracteres';

const Validaciones = {
  validarCampoVacio: (valor) => {
    if (!valor.trim()) {
      return `Este campo no puede estar vacío.`;
    } else {
      return "";
    }
  },
  validarCampoVacioSeleccionEquipo: (valor) => {
    if (!valor.trim() || valor==="Selecciona un equipo") {
      return `Este campo no puede estar vacío.`;
    } else {
      return "";
    }
  },
 
   validarNombre: (nombre) => {
      const newValueAlpha = nombre.replace(/[^a-zA-Z\s]/g, '').substring(0, 30);
          
      if (nombre.length > 30) {
      return errorTreintaCaracteres;
      } else if (newValueAlpha !== nombre) {
        return errorCaracteresNoPermitidos;       
      } else {
        return '';
      }
    },
    
    validarEquipo : (nombre) => {
      const caracteresNoPermitidos = /[()\/\\,;{}\[\]^?]/;
    
      if (nombre.length > 60) {
        return errorTreintaCaracteres;
      } else if (caracteresNoPermitidos.test(nombre)) {
        return errorCaracteresNoPermitidos;
      } else {
        return '';
      }
    },

  devolverNombre:(data)=>{
    const newValueAlpha = data.replace(/[^a-zA-Z\s]/g, '').substring(0, 30);
    return newValueAlpha;
  },
  devolverNombreEquipo:(data)=>{
    const newValueAlpha = data.replace(/[^a-zA-Z\s]/g, '').substring(0, 60);
    return newValueAlpha;
  },

  validarApellido: (apellido) => {
    const apellidoRegex = /^[A-Za-z]{3,30}$/;

    if (!apellidoRegex.test(apellido)) {
      return "Por favor, ingrese un apellido válido (entre 3 y 30 caracteres alfabéticos, sin espacios).";
    } else {
      return "";
    }
  },
    validarCI: (CI) => {
      const newValueID = CI.replace(/[^\d]/g, '').substring(0, 8);


      if (CI.length > 8) {
        return errorOchoCaracteres;
      } else if (newValueID !== CI) {
        return errorSoloNumeros;        
      } else if (CI.length < 7) {
         return errorSieteCaracteres;
      } else {
        return "";}
    },

    devolverCI:(ciDev)=>{
      const newValueID = ciDev.replace(/[^\d]/g, '').substring(0, 8);
      return newValueID;
    },

    

  validarCorreo: (correo) => {

    const correoRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

           if (correo.length > 60) {
          return errorSesentaCaracteres;
        } else if (!correoRegex.test(correo)) {
          return errorCorreo;
        } else{
           return "";
        }
  },

  devolverCorreo:(correo)=>{
    const cor=correo.replace(/[^a-zA-Z0-9_.@-]/g, '').substring(0, 60);
    return cor;
  },
  validarGenero: (genero) => {
    if (genero !== "F" && genero !== "M") {
      return "Por favor, seleccione un género válido.";
    } else {
      return "";
    }
  },
  validarTelefono: (telefono) => {
    const telefonoRegex = telefono.replace(/[^\d]/g, '').substring(0, 8);
    if (telefono.length > 8) {
      return errorOchoCaracteres;
    } else if (telefonoRegex !== telefono) {
      return errorSoloNumeros;        
    } else if (telefono.length < 8) {
       return errorMinOchoCaracteres;
    } else {
      return "";
    }
  },
  devolverTelefono: (telefono) => {
    const telefonoR = telefono.replace(/[^\d]/g, '').substring(0, 8);
    
      return telefonoR;
  },


};
export default Validaciones;