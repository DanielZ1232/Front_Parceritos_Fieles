import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import Swal from 'sweetalert2'; // Importa SweetAlert2
import Logo from '../assets/Imagenes/logo.png';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoImg = styled.img`
  width: 80px;
  height: auto;
  margin-top: 2px;
  border-radius: 10px;
`;

const Nav = styled.div`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: flex-end;
  margin-right: 20px;
  font-size: large;
  font-family: Poppins-Medium;
  color: black;
`;

const Dropdown = styled.div`
  margin-left: 20px;
  position: relative;

  &:hover .dropdown-content {
    display: block;
  }
`;

const NavItem = styled.div`
  margin-left: 20px;
  position: relative;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  padding: 15px 30px;
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
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownContentLink = styled.a`
  display: block;
  color: rgb(0, 0, 0);
  padding: 8px 10px;
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`; 

const NavBarEmpleado = () => {
  const navigate = useNavigate(); // Hook para redirección
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
    // Muestra la alerta de éxito antes de redirigir
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sesión cerrada con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      // Limpia el almacenamiento local
      localStorage.removeItem('userToken');
      // Redirige a la página de inicio de sesión después de mostrar la alerta
      navigate('/');
    });
  };

  return (
    <div>
      <Header>
        <div className="logo">
          <Link href="/menuEmpleado">
            <LogoImg src={Logo} alt="Logo Parceritos Fieles" />
          </Link>
        </div>
        <Nav>
          <NavItem>
            <Link href="/menuEmpleado">Inicio</Link>
          </NavItem>
          <Dropdown>
            <Link href="#">Mascotas</Link>
            <DropdownContent className="dropdown-content">
              <DropdownContentLink href="/consultarMascotasE">Consultar</DropdownContentLink>
              <DropdownContentLink href="/asistencia">Asistencia</DropdownContentLink>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <Link href="#">Reservas</Link>
            <DropdownContent className="dropdown-content">
              <DropdownContentLink href="/consultarReservasE">Consultar</DropdownContentLink>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <Link href="#">Quejas</Link>
            <DropdownContent className="dropdown-content">
              <DropdownContentLink href="/consultarQuejaE">Consultar</DropdownContentLink>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <Circle>
              {initials} {/* Muestra las iniciales dentro del círculo */}
            </Circle>
            <DropdownContent className="dropdown-content">
              <DropdownContentLink href="/miPerfilE">Mi Perfil</DropdownContentLink>
              <DropdownContentLink href="#" onClick={handleLogout}>
                Cerrar sesión
              </DropdownContentLink>
            </DropdownContent>
          </Dropdown>
        </Nav>
      </Header>
    </div>
  );
}

export default NavBarEmpleado;
