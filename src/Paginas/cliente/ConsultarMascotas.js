import React, { useEffect, useRef } from 'react';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import './consultarMascotas.css';

const ConsultarMascotas = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clientes/mascotas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: localStorage.getItem('usuarioId') }),
        });

        if (response.ok) {
          const data = await response.json();

          // Destruir instancia previa de DataTable si existe
          if ($.fn.DataTable && $.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
          }

          // Inicializar DataTable
          $(tableRef.current).DataTable({
            data: data.reverse(),
            columns: [
              { title: 'Nombre', data: 'nombre' },
              { title: 'Raza', data: 'raza' },
              { title: 'Edad', data: 'edad' },
              {
                title: 'Acciones',
                data: 'id_Mascota',
                render: (data) => `
                  <a href="/perfil-mascota/${data}" class="btn btn-primary actualizar-btn"">
                    Perfil
                  </a>
                `,
              },
            ],
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json', // Traducción al español
            },
            responsive: true,
          });
        } else {
          console.error('Error al obtener las mascotas:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchMascotas();

    return () => {
      // Verificar si DataTable está inicializado antes de destruirlo
      if ($.fn.DataTable && $.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  return (
    <div className="page-container">
      <NavBarCliente />
      <main>
        <section className="container">
          <div className="content">
            <h2 className="fade-in">Consultar Mascotas</h2>
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

export default ConsultarMascotas;
