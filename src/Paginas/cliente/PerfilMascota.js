import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';

import './PerfilMascota.css';
import Swal from 'sweetalert2';

const PerfilMascota = () => {
  const { id } = useParams(); // Obtenemos el id de la mascota desde la URL
  const [mascota, setMascota] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('usuarioId'); // Obtener userId desde localStorage

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mascotas/perfil', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, userId }) // Enviar id de la mascota y userId en el cuerpo
        });

        if (response.ok) {
          const data = await response.json();
          setMascota(data);
        } else {
          console.error('Error al obtener la mascota:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    if (userId) {
      fetchMascota();
    } else {
      console.log('Usuario ID no encontrado en localStorage');
    }
  }, [id, userId]);

  // Función para eliminar la mascota
  const handleEliminar = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('http://localhost:5000/api/mascotas/eliminar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, userId }) // Enviar id de la mascota y userId en el cuerpo
        });

        if (response.ok) {
          await Swal.fire({
            title: "Eliminado!",
            text: "La mascota ha sido eliminada.",
            icon: "success"
          });
          navigate('/consultar-mascota'); // Redirige después de eliminar
        } else {
          console.error('Error al eliminar la mascota:', response.status);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la mascota. Inténtelo de nuevo.',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        console.error('Error de red:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'No se pudo eliminar la mascota. Inténtelo de nuevo más tarde.',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200">
  <NavBarCliente />
  <main className="flex-grow container mx-auto py-10 px-6">
    {mascota ? (
      <>
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Perfil de la Mascota
        </h1>
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <i className="fa-solid fa-paw text-blue-500 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Nombre</h2>
                  <p className="text-xl font-bold text-gray-900">{mascota.nombre}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <i className="fa-solid fa-calendar text-green-500 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 -ml-7">Edad</h2>
                  <p className="text-xl font-bold text-gray-900">{mascota.edad} años</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <i className="fa-solid fa-weight text-yellow-500 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 -ml-3">Peso</h2>
                  <p className="text-xl font-bold text-gray-900">{mascota.peso} kg</p>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <i className="fa-solid fa-dog text-purple-500 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Raza</h2>
                  <p className="text-xl font-bold text-gray-900">{mascota.raza}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                  <i className="fa-solid fa-notes-medical text-pink-500 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Enfermedades</h2>
                  <p className="text-xl font-bold text-gray-900">
                    {mascota.enfermedades || 'No tiene'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 p-4 rounded-full">
                  <i className="fa-solid fa-syringe text-teal-500 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Esterilizado</h2>
                  <p className="text-xl font-bold text-gray-900">
                    {mascota.esterilizado === 'si' ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de eliminar */}
        <div className="mt-10 text-center">
          <button
            onClick={handleEliminar}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
          >
            Eliminar Mascota
          </button>
        </div>
      </>
    ) : (
      <p className="text-center text-lg text-gray-600 animate-pulse">
        Cargando perfil de la mascota...
      </p>
    )}
  </main>
  <Footer />
  <a
    href="https://wa.me/3103409688"
    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fa-brands fa-whatsapp text-xl"></i>
  </a>
</div>


  );
};

export default PerfilMascota;
