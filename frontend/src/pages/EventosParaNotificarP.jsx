import React from 'react';

import Aside from '../components/aside';
import Header from '../components/header';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Prueba from '../components/EventosParaNotificarNuevo'
const EventosNotificarE = () => {
  
  return (
    <div>
      <Header />
      <div className="main-container" >
        <div className="column1">
          <div className="news-section">
            <Navbar />
          </div>
        </div>
        <div className="column">
          <div className="tweet-composer">
            <Prueba />
          </div>
        </div>
        <div className="column2">
          <div className="news-section">
            <Aside />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventosNotificarE;