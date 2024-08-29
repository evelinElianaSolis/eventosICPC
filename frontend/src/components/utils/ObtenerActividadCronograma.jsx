import { useState, useEffect } from 'react';
import axios from '../api/conexionApi';

const nombreCronograma = "Cronograma general";

const useFetchActividades = (idEventSpecify) => {
  const [activity, setActivity] = useState({});

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await axios.get(`./obtenerActividadesPorEvento/${idEventSpecify}`);
        const actividadCr = response.data.actividades.find(actividad => actividad.nombreActividad === nombreCronograma);
        setActivity(actividadCr || {}); // Si no se encuentra la actividad, establece un objeto vacío
      } catch (error) {
        console.error('Error al obtener actividades:', error);
      }
    };

    // Llama a fetchActividades al renderizar el componente
    fetchActividades();
  }, [idEventSpecify]); // Asegúrate de incluir las dependencias necesarias

  return activity;
};

export default useFetchActividades;
