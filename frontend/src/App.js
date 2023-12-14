import React from 'react';


import { BrowserRouter, Routes, Route} from 'react-router-dom';

import RegistroParticipantes from "./pages/RegistraParticipantes";
import CrearEvento from "./pages/CrearEvento";
import CrearTipoEvento from "./pages/CrearTipoEvento";
import Home from "./pages/Home";
import VerInformacionEvento from './pages/VerInformacionEvento'
import ConfigurarEvento from "./pages/ConfigurarEvento";
import RegistrarEquipo from "./pages/RegistrarEquipo";
import RegistroParticipanteToEquipo from "./pages/RegistrarParticipanteToEquipo";
import EventosRegistroParticipantes from './pages/EventosParaRegistrarParticipante';
import EventosRegistrarEquipo from './pages/EventosParaRegistrarEquipo';
import EditarEvento from './pages/EditarEvento';
import EventosEditarEvento from './pages/EventosEditarEvento';
import RegistrarEquipoOp2 from './pages/RegistrarEquipoOp2';
import EventosParaNotificar from './pages/EventosParaNotificarP';
import EnviarNotificaciones from './pages/EnviarNotificacionesP';

function App(){
  return(
    <BrowserRouter>
    
      <Routes>
        <Route path = "/" element ={<Home />} />
        <Route path = "/Home" element ={<Home />} />
        <Route path ="/CrearEvento/:id" element={<CrearEvento/>}/>
        <Route path ="/CrearTipoEvento" element={<CrearTipoEvento />} />
        <Route path ="/RegistroParticipantes/:id" element={<RegistroParticipantes />} />
        <Route path = "/VerInformacionEvento/:id" element ={<VerInformacionEvento />} />
        <Route path = "/RegistrarEquipo/:id" element ={<RegistrarEquipo />} />
        <Route path ="/ConfigurarEvento" element={<ConfigurarEvento/>} />
        <Route path = "/RegistroParticipanteToEquipo/:id" element ={<RegistroParticipanteToEquipo />} />
        <Route path = "/EventosRegistroParticipantes" element ={<EventosRegistroParticipantes />} />
        <Route path = "/EventosRegistrarEquipo" element ={<EventosRegistrarEquipo />} />
        <Route path = "/EditarEvento/:id" element ={<EditarEvento/>} />
        <Route path = "/EventosEditarEvento" element ={<EventosEditarEvento/>} />
        <Route path = "/EventosParaNotificar/" element={<EventosParaNotificar/>}/>
        <Route path = "/EnviarNotificaciones/:id/:id2" element={<EnviarNotificaciones/>}/>

        <Route path = "/RegistrarEquipoOp2/:id/:id2/:numE/:numP" element={<RegistrarEquipoOp2/>}/>
        <Route path = "*" element ={<Home />} />
      </Routes>
    
    </BrowserRouter>
      
   
  );
}
export default App;