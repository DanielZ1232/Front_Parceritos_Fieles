import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import Modal from 'react-modal';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    borderRadius: '12px',
    padding: '25px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Asistencias = () => {
  const [modalData, setModalData] = useState([]);
  const [isColegioModalOpen, setIsColegioModalOpen] = useState(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isPasadiaModalOpen, setIsPasadiaModalOpen] = useState(false);

  const handleAsistenciaChange = (index) => {
    const updatedData = [...modalData];
    updatedData[index].asistio = !updatedData[index].asistio;
    setModalData(updatedData);
  };

  const registrarAsistencias = () => {
    const asistencias = modalData.map((mascota) => ({
      id_Mascota: mascota.id_Mascota,
      tipo_servicio: mascota.tipo_servicio,
      asistio: mascota.asistio ? 'Si' : 'No',
    }));

    axios
      .post('http://localhost:5000/registrar-asistencias', { asistencias }, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert('Asistencias registradas exitosamente');
        closeModal('colegio');
        closeModal('hotel');
        closeModal('pasadia');
      })
      .catch((error) => {
        console.error('Error al registrar asistencias:', error);
      });
  };

  const openModal = (tipo) => {
    const endpoint = tipo === 'colegio' ? '/mascotas/colegio' : `/reservas/${tipo}`;
    axios
      .get(`http://localhost:5000${endpoint}`)
      .then((response) => {
        setModalData(response.data);
        if (tipo === 'colegio') setIsColegioModalOpen(true);
        if (tipo === 'hotel') setIsHotelModalOpen(true);
        if (tipo === 'pasadia') setIsPasadiaModalOpen(true);
      })
      .catch((error) => {
        console.error(`Error al obtener datos para ${tipo}:`, error);
      });
  };

  const closeModal = (tipo) => {
    setModalData([]);
    if (tipo === 'colegio') setIsColegioModalOpen(false);
    if (tipo === 'hotel') setIsHotelModalOpen(false);
    if (tipo === 'pasadia') setIsPasadiaModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow bg-gray-100 py-10 px-6">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Registro de Asistencias
          </h2>

          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={() => openModal('colegio')}
              className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
            >
              Colegio
            </button>
            <button
              onClick={() => openModal('hotel')}
              className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300"
            >
              Hotel
            </button>
            <button
              onClick={() => openModal('pasadia')}
              className="px-6 py-3 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 hover:shadow-lg transition-all duration-300"
            >
              Pasadía
            </button>
          </div>

          <Modal
            isOpen={isColegioModalOpen || isHotelModalOpen || isPasadiaModalOpen}
            onRequestClose={() => {
              setIsColegioModalOpen(false);
              setIsHotelModalOpen(false);
              setIsPasadiaModalOpen(false);
            }}
            style={customModalStyles}
            contentLabel="Asistencias"
          >
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-700">
              {isColegioModalOpen
                ? 'Colegio - Asistencias'
                : isHotelModalOpen
                ? 'Hotel - Asistencias'
                : 'Pasadía - Asistencias'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {modalData.map((mascota, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    {mascota.nombre || mascota.nombre_mascota}
                  </p>
                  <p className="text-sm text-gray-600">
                    Dirección: {mascota.direccion_dueño || mascota.direccion_cliente}
                  </p>
                  <p className="text-sm text-gray-600">
                    Celular: {mascota.celular || mascota.celular_cliente}
                  </p>
                  <div className="mt-3 flex items-center">
                    <label className="text-gray-800 mr-2">Asistió:</label>
                    <input
                      type="checkbox"
                      checked={mascota.asistio || false}
                      onChange={() => handleAsistenciaChange(index)}
                      className="h-5 w-5 text-blue-500 rounded focus:ring focus:ring-blue-300"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={registrarAsistencias}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 mr-4"
              >
                Registrar Asistencias
              </button>
              <button
                onClick={() =>
                  closeModal(
                    isColegioModalOpen ? 'colegio' : isHotelModalOpen ? 'hotel' : 'pasadia'
                  )
                }
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Asistencias;
