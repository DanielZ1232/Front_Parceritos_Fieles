import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Footer from '../../components/footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Perro1 from '../../assets/Imagenes/perro1.jpeg';
import 'tailwindcss/tailwind.css';
import logo from '../../assets/Imagenes/logo.png';

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
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 2;
  background: transparent;
  padding: 0 20px;
  font-family: Poppins-ExtraLight;
  font-size: large;
`;

const Logo = styled.img`
  width: 80px;
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

const MenuGerente = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showClienteSearch, setShowClienteSearch] = useState(false);
  const [documento, setDocumento] = useState('');
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [initials, setInitials] = useState('');
  const navigate = useNavigate();


  // Función para obtener empleados
  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gerente/mis-empleados');
      if (!response.ok) {
        throw new Error('Error al obtener empleados.');
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los empleados.',
      });
    }
  };

  // Llamar a la función para obtener empleados al montar el componente
  useEffect(() => {
    fetchEmpleados();
  }, []);

   // Función para buscar cliente
   const handleBuscarCliente = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/buscar/${documento}`);
      if (!response.ok) {
        throw new Error('Cliente no encontrado.');
      }
      const cliente = await response.json();
      setClienteEncontrado(cliente);
    } catch (error) {
      console.error('Error al buscar cliente:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo buscar el cliente.',
      });
    }
  };
  
   // Función para cambiar el rol a empleado
   const handleCambioRol = async () => {
    if (!clienteEncontrado) return;

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${clienteEncontrado.id_Usuario}/rol`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rol: 'Empleado' }),
      });
      if (!response.ok) {
        throw new Error('Error al cambiar el rol del cliente.');
      }
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El cliente ahora es un empleado.',
      });
      setEmpleados([...empleados, clienteEncontrado]); // Agrega el nuevo empleado a la lista
      setClienteEncontrado(null);
      setDocumento('');
      setShowClienteSearch(false);
    } catch (error) {
      console.error('Error al cambiar rol:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo cambiar el rol del cliente.',
      });
    }
  };

  // Función para eliminar un empleado
  const handleEliminarEmpleado = async (idEmpleado) => {
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${idEmpleado}/rol`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rol: 'Cliente' }),
      });
      if (!response.ok) {
        throw new Error('Error al cambiar el rol del empleado.');
      }
      // Filtra el empleado eliminado y actualiza la lista
      setEmpleados(empleados.filter((empleado) => empleado.id_Usuario !== idEmpleado));
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El empleado ha sido eliminado.',
      });
    } catch (error) {
      console.error('Error al eliminar empleado:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar al empleado.',
      });
    }
  };

  // Llamar a la función para obtener empleados al montar el componente
  useEffect(() => {
    fetchEmpleados();
  }, []);

  // Cargar nombre del usuario desde localStorage
  useEffect(() => {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      const iniciales = `${nombreUsuario.charAt(0)}`;
      setInitials(iniciales);
      setNombre(nombreUsuario);
    }
  }, []);



  const handleLogout = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sesión cerrada con éxito',
      showConfirmButton: false,
      timer: 1500,
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
                    <Logo src={logo} alt="Logo" />
                    <NavLinks>
                        <Dropdown>
                            <Link href="/menuGerente">Inicio</Link>
                        </Dropdown>
                        <Dropdown>
                            <Link href="#">Mascotas</Link>
                            <DropdownContent className="dropdown-content">
                                <DropdownContentLink href="/consultarMascotaG">Consultar</DropdownContentLink>
                            </DropdownContent>
                        </Dropdown>
                        <Dropdown>
                            <Link href="#">Reservas</Link>
                            <DropdownContent className="dropdown-content">
                                <DropdownContentLink href="/consultarReservasG">Consultar</DropdownContentLink>
                            </DropdownContent>
                        </Dropdown>
                        <Dropdown>
                            <Link href="#">Quejas</Link>
                            <DropdownContent className="dropdown-content">
                                <DropdownContentLink href="/consultarQuejasG">Consultar</DropdownContentLink>
                            </DropdownContent>
                        </Dropdown>
                        <Dropdown>
                            <Circle>
                                {initials} {/* Muestra las iniciales dentro del círculo */}
                            </Circle>
                            <DropdownContent className="dropdown-content">
                                <DropdownContentLink href="/miPerfilG">Mi Perfil</DropdownContentLink>
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

            {/* Contenido del equipo y modal de agregar empleado */}
            <div className="container mx-auto my-10 bg-white rounded-xl shadow-lg p-8 max-w-7xl text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Tu Equipo de Trabajo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 justify-center">
                {empleados.map((empleado) => (
                    <div
                        key={empleado.id_Usuario}
                        className="bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center"
                    >
                        {/* Iniciales */}
                        <div className="flex-shrink-0 bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
                            <span className="text-green-600 font-bold text-xl">
                                {empleado.nombre.charAt(0)}{empleado.apellido.charAt(0)}
                            </span>
                        </div>

                        {/* Información del empleado */}
                        <h3 className="text-xl font-semibold text-gray-700 mt-4">{empleado.nombre} {empleado.apellido}</h3>
                        <p className="text-sm text-gray-500 mt-1">{empleado.correo}</p>
                        <p className="text-sm text-gray-500 mt-1">Celular: {empleado.celular}</p>
                        <p className="text-sm font-medium text-green-600 mt-2">{empleado.rol}</p>

                        {/* Botón de eliminar */}
                        <button
                            className="mt-4 bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                            onClick={() => handleEliminarEmpleado(empleado.id_Usuario)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            {/* Botón para agregar empleado */}
            <div className="flex justify-center mt-10">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 duration-300"
                    onClick={() => setShowClienteSearch(true)}
                >
                    + Agregar Empleado
                </button>
            </div>
        </div>

            {/* Modal para buscar cliente */}
            {showClienteSearch && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 transform transition-all duration-300 ease-in-out scale-105">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Buscar Cliente para Agregar</h3>
                            <button onClick={() => {
                                setShowClienteSearch(false);
                                setClienteEncontrado(null);
                                setDocumento('');
                              }} className="text-red-600 text-xl font-bold hover:bg-transparent focus:bg-transparent"
                              >
                                ×
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Número de Documento"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        <button
                            className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                            onClick={handleBuscarCliente}
                        >
                            Buscar
                        </button>

                        {clienteEncontrado && (
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 bg-green-100 rounded-full h-12 w-12 flex items-center justify-center">
                                <span className="text-green-600 font-bold text-xl">
                                    {clienteEncontrado.nombre.charAt(0)}
                                    {clienteEncontrado.apellido.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {clienteEncontrado.nombre} {clienteEncontrado.apellido}
                                  </h3>
                                  <p className="text-sm text-gray-500 text-center">{clienteEncontrado.correo}</p>
                                </div>

                                <div className="mt-4 pl-1">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Celular:</span> {clienteEncontrado.celular || 'No disponible'}
                                  </p>
                                  <p className="mt-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full inline-block">
                                    {clienteEncontrado.rol}
                                  </p>
                                </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                <button
                                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200 text-center"
                                  onClick={handleCambioRol}
                                >
                                  Cambiar a Empleado
                                </button>
                              </div>
                                
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
  );
};

export default MenuGerente;
