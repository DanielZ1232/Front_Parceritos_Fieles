import React, { useEffect, useRef } from 'react';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import './ConsultarReservaC.module.css';

const ConsultarReservaC = () => {
  const tableRef = useRef(null);
  const userId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clientes/${userId}/reservas`);
        if (response.ok) {
          const data = await response.json();

          // Destruir instancia previa de DataTable si existe
          if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
          }

          // Inicializar DataTable con los datos obtenidos
          $(tableRef.current).DataTable({
            data: data.reverse(),
            columns: [
              { title: 'Nombre Mascota', data: 'nombre_mascota' },
              {
                title: 'Fecha Inicio',
                data: 'fecha_Inicio',
                render: (data) => new Date(data).toLocaleDateString(),
              },
              {
                title: 'Fecha Final',
                data: 'fecha_Fin',
                render: (data) => (data ? new Date(data).toLocaleDateString() : '-'),
              },
              { title: 'Estado', data: 'estado' },
              
            ],
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
            },
            responsive: true,
          });

          
        } else {
          console.error('Error al obtener las reservas:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchReservas();

    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [userId]);

  

  return (
    <div className="page-container">
      <NavBarCliente />
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
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default ConsultarReservaC;
