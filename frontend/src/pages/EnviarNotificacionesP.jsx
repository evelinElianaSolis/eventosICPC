import React from 'react';
import Aside from '../components/aside';
import Header from '../components/header';
import Footer from '../components/footer';
import Formulario2 from '../components/ModalRegistrarParticipanteToEquipo'
import Formulario from '../components/VistaEnviarNotificaciones'
import Navbar from '../components/navbar';
import '../components/assets/styles.css'
import { useParams } from 'react-router-dom';
const RegistroEquipoOp2 = () => {
 const { id,id2} = useParams();
 //  <RegistrarEquipoOp numero={id}/>
 return (
  <div>
    <Header />
    <div className="el-main-container" >
      <div className="el-column1">
        <div className="el-news-section">
          <Navbar />
        </div>
      </div>
      <div className="el-column">
        <div className="el-tweet-composer">
          <Formulario evento={id} equipo={id2}/>
        </div>
      </div>
      <div className="el-column2">
        <div className="el-news-section">
          <Aside />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  
);
}

export default RegistroEquipoOp2;