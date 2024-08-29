import React from 'react';
import './assets/aside.css'

const Menu = () => {
  return (
    <nav className="asidecontent">
      <h2>Notificaciones</h2>
      <a href="" className="asideimg">
      <img src="https://cdn-icons-png.flaticon.com/512/6713/6713079.png" alt="Usuario" />
      <div className="asidep">
        <p>Curso de actualizacion de software!!
        </p>
      </div>
      </a>

      <a href="" className="asideimg">
      <img src="https://cdn-icons-png.flaticon.com/512/7135/7135135.png" alt="Usuario" />
      <div className="asidep">
        <p>Actualizaciond de una terminal css 
        </p>
      </div>
      </a>
    </nav>
  );
};

export default Menu;