import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar el CSS del menú
import logo from '../assets/Imagenes/logo.png'; // Asegúrate de que esta ruta sea correcta
import Swal from 'sweetalert2'; // Importa SweetAlert2
import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;

  &:hover .dropdown-content {
    display: block;
  }
`;

const Circle = styled.div`
  width: 40px; 
  height: 40px; 
  background-color: orange; /* Color del círculo */
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase; /* Para asegurarse de que las letras estén en mayúsculas */
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownContentLink = styled.a`
  display: block;
  color: black;
  padding: 8px 10px;
  text-decoration: none;
  font-family: Poppins-ExtraLight;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;


const NavBarCliente = () => {
  const [initials, setInitials] = useState('');

  useEffect(() => {
    // Obtener el nombre completo del usuario desde localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario') || '';

    if (nombreUsuario) {
      // Tomar la primera letra del nombre y del apellido
      const iniciales = `${nombreUsuario.charAt(0)}`;
      setInitials(iniciales);
    }
  }, []);

  const handleLogout = () => {
    // Maneja el cierre de sesión
    localStorage.removeItem('userToken');
    
    // Muestra una notificación de éxito
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Has cerrado sesión exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = '/'; // Redirige a la página de inicio después de la notificación
    });
  };

 
  return (
    <header className="navbar-cliente d-flex justify-content-between align-items-center bg-white p-3 shadow-sm"
    >
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo Parceritos Fieles" className="logo-img" />
        </Link>
      </div>
      <nav style={{marginRight: '20px',
         gap: '40px',
         fontFamily: 'Poppins-ExtraLight'
      }}>
        <ul className="nav"
        style={{marginRight: '20px',
          gap: '43px',
        }}>
          <li className="nav-item">
            <Link className="nav-link" to="/menu">Inicio</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#">
              Mascotas
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/registro-mascota">Registrar</Link>
              <Link className="dropdown-item" to="/consultar-mascota">Consultar</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#">
              Reservas
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/reserva">Registrar</Link> {/* Cambiado a /reserva */}
              <Link className="dropdown-item" to="/consultarReservaC">Consultar</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#">
              Quejas
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/crearQuejaC">Registrar</Link> {/* Ruta actualizada */}
              <Link className="dropdown-item" to="/consultarQuejaC">Consultar</Link> {/* Ruta actualizada */}
            </div>
          </li>
          <Dropdown>
          <Circle>
            {initials} {/* Muestra las iniciales dentro del círculo */}
          </Circle>
          <DropdownContent className="dropdown-content">
            <DropdownContentLink href="/PerfilC">Mi Perfil</DropdownContentLink>
            <DropdownContentLink href="#" onClick={handleLogout}>
              Cerrar sesión
            </DropdownContentLink>
          </DropdownContent>
        </Dropdown>
        </ul>
      </nav>
    </header>
  );
}; 




export default NavBarCliente;
