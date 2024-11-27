import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBarEmpleado from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';


const ConsultarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/empleado/reservas');
        const data = respuesta.data.reverse();

        if (!Array.isArray(data) || data.length === 0) {
        console.warn('No se encontraron reservas:', data);
        setReservas([]);
      } else {
        setReservas(data);
      }
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  fetchReservas();
}, []);

  useEffect(() => {
  if (!isLoading && reservas.length > 0) {
    console.log('Inicializando DataTable con reservas:', reservas);
  
    // Destruir instancia previa, si existe
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().clear().destroy();
    }
  
    // Inicializar DataTable con los datos correctos
    $(tableRef.current).DataTable({
      data: reservas,
      columns: [
        { title: 'ID', data: 'id_Reservas' },
        { title: 'Fecha de inicio', data: 'fecha_Inicio', render: (data) => new Date(data).toLocaleDateString() },
        { title: 'Fecha de final', data: 'fecha_Fin', render: (data) => new Date(data).toLocaleDateString() },
        { title: 'Celular', data: 'celular' },
        { title: 'Correo', data: 'correo' },
        { title: 'Nombre del Dueño', data: 'nombre_dueño' },
        { title: 'Nombre de la Mascota', data: 'nombre_mascota' },
        { title: 'Tipo de Servicio', data: 'tipo_servicio' },
        { title: 'Estado', data: 'estado' },
        {
          title: 'Acciones',
          data: null,
          render: (data, type, row, meta) => {
            const confirmarDisabled = row.estado === 'Confirmado' || row.estado === 'Cancelado';
            return `
              <button class="btn-icon confirmar-btn" data-id="${row.id_Reservas}" ${confirmarDisabled ? 'disabled' : ''}>
                <i class="fas fa-check-circle icon-check"></i>
              </button>
              <button class="btn-icon cancelar-btn" data-id="${row.id_Reservas}" ${confirmarDisabled ? 'disabled' : ''}>
                <i class="fas fa-times-circle icon-cancel"></i>
              </button>`;
            },
          },
        ],
        responsive: true,
      });
    }
  }, [isLoading, reservas]);
  
    // Limpia eventos previos para evitar duplicados
    $(tableRef.current).on('click', '.confirmar-btn', function () {
      const id = $(this).data('id'); // Obtén el ID de la reserva
      console.log('Array de reservas:', reservas);
      console.log('ID capturado:', id, 'Tipo:', typeof id);
    
      const reserva = reservas.find((r) => {
        console.log('Comparando:', r.id_Reservas, 'con', id, 'Tipos:', typeof r.id_Reservas, typeof id);
        return r.id_Reservas === parseInt(id, 10); // Ajustar si es necesario
      }); 
      if (!reserva) {
        console.error(`No se encontró la reserva con id_Reservas: ${id}`);
        return;
      }
    
      confirmarReserva(reserva); // Pasa la reserva completa
    });
    
  
    $(tableRef.current).on('click', '.cancelar-btn', function () {
      const id = $(this).data('id'); // Obtén el ID de la reserva
      console.log('Array de reservas:', reservas);
      console.log('ID capturado:', id, 'Tipo:', typeof id);
    
      const reserva = reservas.find((r) => {
        console.log('Comparando:', r.id_Reservas, 'con', id, 'Tipos:', typeof r.id_Reservas, typeof id);
        return r.id_Reservas === parseInt(id, 10); // Ajustar si es necesario
      }); 
      if (!reserva) {
        console.error(`No se encontró la reserva con id_Reservas: ${id}`);
        return;
      }
    
      cancelarReserva(id, 'Cancelar'); // Pasa la reserva completa
    });
  
  

    const confirmarReserva = (reserva) => {
      if (!reserva || !reserva.id_Reservas) {
        console.error('Reserva inválida:', reserva);
        Swal.fire({
          title: 'Error',
          text: 'La reserva seleccionada no es válida.',
          icon: 'error',
        });
        return;
      }
    
      Swal.fire({
        title: '¿Estás seguro de confirmar esta reserva?',
        text: 'La reserva será confirmada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Actualiza el estado en el backend
            await axios.put(`http://localhost:5000/api/reservas/${reserva.id_Reservas}/estado`, {
              estado: 'Confirmado',
            });
    
            // Actualiza el estado local
            reserva.estado = 'Confirmado';
            setReservas([...reservas]); // Actualiza el estado local de las reservas
    
            // Alerta de éxito
            Swal.fire({
              title: '¡Confirmado!',
              text: 'La reserva ha sido confirmada exitosamente.',
              icon: 'success',
            });
          } catch (error) {
            console.error('Error al confirmar la reserva:', error);
    
            // Alerta de error
            Swal.fire({
              title: 'Error',
              text: 'No se pudo confirmar la reserva.',
              icon: 'error',
            });
          }
        }
      });
    };
  

  const cancelarReserva = async (id_Reservas) => {
    if (!reservas || reservas.length === 0) {
      console.error('No hay reservas disponibles para actualizar.');
      Swal.fire({
        title: 'Error',
        text: 'No hay reservas disponibles.',
        icon: 'error',
      });
      return;
    }
  
    const reserva = reservas.find((res) => res.id_Reservas === id_Reservas);
    if (!reserva) {
      console.error(`No se encontró la reserva con id_Reservas: ${id_Reservas}`);
      Swal.fire({
        title: 'Error',
        text: 'La reserva seleccionada no es válida.',
        icon: 'error',
      });
      return;
    }
  
    const nuevaReserva = { ...reserva, estado: 'Cancelado' };
  
    Swal.fire({
      title: '¿Estás seguro de cancelar esta reserva?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Actualiza el estado en el backend
          await axios.put(`http://localhost:5000/api/reservas/${id_Reservas}/estado`, {
            estado: 'Cancelado',
          });
  
          // Actualiza el estado local de las reservas
          const nuevasReservas = reservas.map((res) =>
            res.id_Reservas === id_Reservas ? nuevaReserva : res
          );
          setReservas(nuevasReservas);
  
          // Mensaje de éxito
          Swal.fire({
            title: '¡Cancelado!',
            text: 'La reserva ha sido cancelada.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error al cancelar la reserva:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cancelar la reserva.',
            icon: 'error',
          });
        }
      }
    });
  };
  
  
  

  const styles = `
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 20px;
  }
  .content h2 {
    font-family: 'Poppins-SemiBold', sans-serif;
    color: #28a745;
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    background: linear-gradient(90deg, #1db954, #1ca54f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .table-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  table.dataTable {
    width: 100% !important;
    font-size: 1.2rem;
  }
  .btn-icon {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0 5px;
    transition: transform 0.2s ease, background-color 0.3s ease;
  }
  .btn-icon:hover {
    transform: scale(1.1);
    background-color: rgba(220, 220, 220, 0.3);
    border-radius: 50%;
  }
  .icon-check {
    color: #28a745;
  }
  .icon-cancel {
    color: #dc3545;
  }
  .btn-icon:disabled {
    opacity: 0.6;
  }
`;


  return (
    <>
      <style>{styles}</style>
      <div className="page-container">
        <NavBarEmpleado />
        <main>
          <section className="container">
            <div className="content">
              <h2 className="fade-in">Consultar Reservas</h2>
              <div className="table-wrapper">
                <table ref={tableRef} className="display" style={{ width: '100%' }}></table>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ConsultarReservas;
