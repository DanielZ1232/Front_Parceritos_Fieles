import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Perro1 from '../../assets/Imagenes/perro1.jpeg';
import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-size: 3rem;
  font-family: Poppins-Light;
  font-weight: bold;
  z-index: 1;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 2;
  background: transparent;
  margin-top: 26px;
  font-family: Poppins-ExtraLight;
  font-size: large;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  margin-right: 61px;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background-color: orange;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const Dropdown = styled.div`
  position: relative;

  &:hover .dropdown-content {
    display: block;
  }
`;

const Link = styled.a`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const MenuEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [initials, setInitials] = useState('');
  const [inscripciones, setInscripciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Cantidad de tarjetas por página
  const navigate = useNavigate();

  useEffect(() => {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      const iniciales = `${nombreUsuario.charAt(0)}`;
      setInitials(iniciales);
      setNombre(nombreUsuario);
    }

    axios.get('http://localhost:5000/api/colegio/pendientes')
      .then(response => {
        setInscripciones(response.data);
      })
      .catch(error => console.error("Error al obtener inscripciones pendientes:", error));
  }, []);

  const handleConfirm = (id_Servicio) => {
    axios.post(`http://localhost:5000/api/colegio/${id_Servicio}/confirmar`)
      .then(() => {
        Swal.fire('Inscripción confirmada', '', 'success');
        setInscripciones(inscripciones.filter(inscripcion => inscripcion.id_Servicio !== id_Servicio));
      })
      .catch(error => console.error("Error al confirmar la inscripción:", error));
  };

  const handleReject = (id_Servicio) => {
    axios.post(`http://localhost:5000/api/colegio/${id_Servicio}/rechazar`)
      .then(() => {
        Swal.fire('Inscripción rechazada', '', 'success');
        setInscripciones(inscripciones.filter(inscripcion => inscripcion.id_Servicio !== id_Servicio));
      })
      .catch(error => console.error("Error al rechazar la inscripción:", error));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = inscripciones.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(inscripciones.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleLogout = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sesión cerrada con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      localStorage.removeItem('usuarioId');
      localStorage.removeItem('nombreUsuario');
      navigate('/');
    });
  };

  return (
    <div>
      <HeroSection>
        <Navbar>
          <NavLinks>
            <Dropdown>
              <Link href="/menuEmpleado">Inicio</Link>
            </Dropdown>
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
              <Circle>{initials}</Circle>
              <DropdownContent className="dropdown-content">
                <DropdownContentLink href="/miPerfilE">Mi Perfil</DropdownContentLink>
                <DropdownContentLink href="#" onClick={handleLogout}>
                  Cerrar sesión
                </DropdownContentLink>
              </DropdownContent>
            </Dropdown>
          </NavLinks>
        </Navbar>

        <HeroImage src={Perro1} alt="Perro1" />
        <HeroText>Bienvenido, {nombre}</HeroText>
      </HeroSection>

      <div className="min-h-screen bg-gray-100 p-5">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-800">Inscripciones Pendientes en Colegio</h2>
  </div>
  <div className="flex flex-wrap justify-center gap-6">
    {paginatedItems.map((inscripcion) => (
      <div
        key={inscripcion.id_Servicio}
        className="bg-white shadow-lg rounded-lg p-5 max-w-xs transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <h3 className="text-xl font-semibold text-gray-800">{inscripcion.nombre_mascota}</h3>
        <p className="text-gray-600">Raza: {inscripcion.raza}</p>
        <p className="text-gray-600">Edad: {inscripcion.edad}</p>
        <p className="text-gray-600">Dueño: {inscripcion.nombre_dueño}</p>
        <p className="text-gray-600">Contacto: {inscripcion.contacto_dueño}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleConfirm(inscripcion.id_Servicio)}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded transition-all hover:bg-green-600 shadow hover:shadow-md"
          >
            Confirmar Inscripción
          </button>
          <button
            onClick={() => handleReject(inscripcion.id_Servicio)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded transition-all hover:bg-red-600 shadow hover:shadow-md"
          >
            Rechazar
          </button>
        </div>
      </div>
    ))}
  </div>

  {inscripciones.length > itemsPerPage && (
    <div className="flex justify-center mt-6 gap-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded font-medium ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-400 text-white hover:bg-green-500 shadow-md hover:shadow-lg'
        } transition-colors duration-300`}
      >
        Anterior
      </button>
      <span className="px-4 py-2 text-gray-700 font-medium">{`Página ${currentPage} de ${totalPages}`}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded font-medium ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-400 text-white hover:bg-green-500 shadow-md hover:shadow-lg'
        } transition-colors duration-300`}
      >
        Siguiente
      </button>
    </div>
  )}
</div>




      <Footer />
    </div>
  );
};

export default MenuEmpleado;
