import React from 'react';
import './assets/header.css'

const Header = () => {
  return (
    <header>
      <div className="menuheader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div><a href="Home" className="logotipo">ICPC-UMSS</a></div>
      <div className="buscador">
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className="usercontent">
        <img src="https://e7.pngegg.com/pngimages/548/649/png-clipart-computer-icons-user-man-person-business-others-miscellaneous-face-thumbnail.png" alt="Avatar" />
        <div>
          <a href="">Nombre de Usuario
          <p>Administrador</p>
          </a>
        </div>
      </div>
      <img src="https://cdn-icons-png.flaticon.com/512/1157/1157000.png"/>
    </header>
  );
};

export default Header;
