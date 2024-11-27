import React, { useState, useEffect } from 'react';
import './menu.css'; // Importa el CSS específico para el menú
import Perro1 from '../../assets/Imagenes/perro1.jpeg';
import Footer from '../../components/footer'; // Asegúrate de importar tu componente Footer
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  background-color: orange; /* Color del círculo */
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

const Menu = () => {
  const [mascotas, setMascotas] = useState([]); // Estado para almacenar las mascotas del cliente
  const [selectedMascota, setSelectedMascota] = useState('');
  const [inscripcionStatus, setInscripcionStatus] = useState('');
  const [nombre, setNombre] = useState('');
  const [initials, setInitials] = useState('');
  const navigate = useNavigate();

  // Obtener el nombre del usuario y las mascotas del cliente
  useEffect(() => {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const usuarioId = localStorage.getItem('usuarioId');

    if (nombreUsuario) {
      const iniciales = `${nombreUsuario.charAt(0)}`;
      setInitials(iniciales);
      setNombre(nombreUsuario);
    }

    // Solicitar mascotas del cliente al backend
    const fetchMascotas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clientes/mascotas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: usuarioId }),
        });

        if (response.ok) {
          const data = await response.json();
          setMascotas(data);  // Guardar las mascotas obtenidas en el estado
        } else {
          console.error('Error al obtener las mascotas:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchMascotas();
  }, []);

  // Función para cerrar sesión
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

  // Función para inscribir una mascota en el servicio de colegio
 // Función para inscribir una mascota en el servicio de colegio
const handleInscribirMascota = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/servicios/inscribir-colegio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mascotaId: selectedMascota,
        userId: localStorage.getItem('usuarioId'),
      }),
    });

    if (response.ok) {
      setInscripcionStatus('Mascota inscrita exitosamente en el servicio de colegio.');
      Swal.fire({
        icon: 'success',
        title: 'Inscripción exitosa',
        text: 'Tu mascota ha sido inscrita exitosamente. Un empleado se pondrá en contacto contigo.',
      });
    } else {
      const errorData = await response.json();
      if (errorData.error === 'La mascota ya está inscrita en el servicio de colegio.') {
        Swal.fire({
          icon: 'warning',
          title: 'Mascota ya inscrita',
          text: 'No puedes inscribir esta mascota porque ya está inscrita en el colegio.',
        });
      } else {
        setInscripcionStatus('Error al inscribir la mascota en el servicio de colegio.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al intentar inscribir a tu mascota. Por favor, intenta nuevamente.',
        });
      }
    }
  } catch (error) {
    setInscripcionStatus('Error de red al intentar inscribir la mascota.');
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo conectar con el servidor. Por favor, revisa tu conexión e intenta nuevamente.',
    });
    console.error('Error de red:', error);
  }
};

   
  return (
    <div>
      <HeroSection>
        <Navbar>
          <NavLinks>
            <Dropdown>
              <Link href="/menu">Inicio</Link>
            </Dropdown>
            <Dropdown>
              <Link href="#">Mascotas</Link>
              <DropdownContent className="dropdown-content">
                <DropdownContentLink href="/registro-mascota">Registrar</DropdownContentLink>
                <DropdownContentLink href="/consultar-mascota">Consultar</DropdownContentLink>
              </DropdownContent>
            </Dropdown>
            <Dropdown>
              <Link href="#">Reservas</Link>
              <DropdownContent className="dropdown-content">
                <DropdownContentLink href="/reserva">Registrar</DropdownContentLink>
                <DropdownContentLink href="/consultarReservaC">Consultar</DropdownContentLink>
              </DropdownContent>
            </Dropdown>
            <Dropdown>
              <Link href="#">Quejas</Link>
              <DropdownContent className="dropdown-content">
                <DropdownContentLink href="/crearQuejaC">Registrar</DropdownContentLink>
                <DropdownContentLink href="/consultarQuejaC">Consultar</DropdownContentLink>
              </DropdownContent>
            </Dropdown>
            <Dropdown>
              <Circle>{initials}</Circle>
              <DropdownContent className="dropdown-content">
                <DropdownContentLink href="/PerfilC">Mi Perfil</DropdownContentLink>
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

      <section className="team bg-gradient-to-br from-blue-100 via-white to-gray-100 py-10 px-6 rounded-lg shadow-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        Inscribir Mascota en el Servicio de Colegio
      </h2>
      <div className="team-members">
        {mascotas.length > 0 ? (
          <>
            <div className="mb-4">
              <label htmlFor="mascotaSelect" className="block text-gray-600 font-medium mb-2">
                Selecciona una mascota:
              </label>
              <select
                id="mascotaSelect"
                value={selectedMascota}
                onChange={(e) => setSelectedMascota(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">-- Selecciona una Mascota --</option>
                {mascotas.map((mascota) => (
                  <option key={mascota.id_Mascota} value={mascota.id_Mascota}>
                    {mascota.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button
                onClick={() => handleInscribirMascota(selectedMascota)}
                disabled={!selectedMascota}
                className={`w-full py-2 px-4 rounded-lg font-semibold text-white 
                  ${selectedMascota ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Inscribir en Colegio
              </button>
              {inscripcionStatus && (
                <p className="mt-4 text-green-600 font-medium">{inscripcionStatus}</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">No tienes mascotas registradas.</p>
        )}
      </div>
    </section>

      <Footer />

      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default Menu;
