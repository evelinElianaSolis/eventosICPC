import React from 'react';
import './assets/header.css'

const Header = () => {
  const toggleMenu = () => {
    console.log("hola")
  }

  return (
    <header>
      <div className="menuheader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        
        <a href="Home" className="logotipo">
         ICPC-UMSS</a></div>
      <div className="buscador">
        
      </div>
      <div className="usercontent">
        <img src="https://img.freepik.com/foto-gratis/hombre-guapo_144627-14222.jpg?w=996&t=st=1703217757~exp=1703218357~hmac=84bbfc2e75b185d110ef2a32e248932193a10bc81f67f5fd3ac3c68de68cc992" alt="Avatar" />
        <div>
          <a href="/">Roberto Foronda
          <p>Administrador</p>
          </a>
        </div>
      </div>
     
    </header>
  );
};

export default Header;
