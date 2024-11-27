import React, { useState, useEffect, useCallback, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import Swal from 'sweetalert2';
import './consultarQuejasC.css';

const ConsultarQuejasC = () => {
  const [quejas, setQuejas] = useState([]);
  const [selectedQueja, setSelectedQueja] = useState(null); // Queja seleccionada para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
  const [modalContent, setModalContent] = useState(''); // Contenido editable
  const tableRef = useRef(null);
  const userId = localStorage.getItem('usuarioId');

  // Fetch quejas desde el backend
  const fetchQuejas = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${userId}/quejas`);
      const data = await response.json();

      if (response.ok) {
        setQuejas(data.reverse());
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener las quejas',
          text: data.error || 'No se pudieron cargar las quejas.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener las quejas',
        text: 'Ocurrió un problema al intentar cargar las quejas.',
      });
    }
  }, [userId]);

  useEffect(() => {
    fetchQuejas();
  }, [fetchQuejas]);

  // Inicializar DataTables
  useEffect(() => {
    if (tableRef.current && quejas.length > 0) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      $(tableRef.current).DataTable({
        data: quejas,
        columns: [
          { title: 'ID', data: 'id_Queja' },
          {
            title: 'Fecha',
            data: 'fecha',
            render: (data) => (data ? new Date(data).toLocaleDateString() : 'Fecha desconocida'),
          },
          { title: 'Contenido', data: 'contenido' },
          {
            title: 'Acciones',
            data: null,
            render: (data, type, row) =>
              `<button class="btn btn-primary actualizar-btn" data-id="${row.id_Queja}">Editar</button>`,
          },
        ],
        language: {
          url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
        },
        responsive: true,
        destroy: true,
      });

      // Manejar clics en botones de edición
      $(tableRef.current).on('click', '.actualizar-btn', function () {
        const idQueja = $(this).data('id');
        const queja = quejas.find((q) => q.id_Queja === idQueja);
        if (queja) {
          setSelectedQueja(queja);
          setModalContent(queja.contenido); // Cargar el contenido actual
          setIsModalOpen(true); // Abrir el modal
        }
      });
    }
  }, [quejas]);

  // Manejar actualización de la queja
  const handleUpdateQueja = async () => {
    if (!modalContent.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'El contenido no puede estar vacío',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/quejas/${selectedQueja.id_Queja}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenido: modalContent }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Queja actualizada',
          text: data.message,
        });
        fetchQuejas(); // Recargar las quejas
        setIsModalOpen(false); // Cerrar el modal
        setSelectedQueja(null); // Limpiar la selección
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: data.error || 'No se pudo actualizar la queja.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: 'Ocurrió un problema al intentar actualizar la queja.',
      });
    }
  };

  return (
    <div className="page-container">
      <NavBarCliente />
      <main>
        <section className="container">
          <div className="content">
            <h2 className="fade-in">Consultar Quejas</h2>
            <div className="table-wrapper">
              <table ref={tableRef} className="display" style={{ width: '100%' }}></table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Editar Queja</h3>
            <textarea
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              rows="5"
              className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleUpdateQueja}
                className="px-4 py-2 btn btn-primary actualizar-btn text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultarQuejasC;
