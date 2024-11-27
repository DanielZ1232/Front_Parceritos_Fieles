import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import NavBarGerente from '../../components/navBarGerente';
import Footer from '../../components/footer';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const ConsultarMascotas = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const obtenerMascotas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/empleados/consultar-mascotas');
        const mascotasData = respuesta.data;

        // Destruir instancia previa de DataTable si existe
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }

        // Inicializar DataTable con los datos obtenidos
        $(tableRef.current).DataTable({
          data: mascotasData,
          columns: [
            { title: 'Nombre', data: 'nombre_mascota' },
            { title: 'Raza', data: 'raza' },
            { title: 'Edad', data: 'edad', render: (data) => `${data} años` },
            { title: 'Sexo', data: 'sexo' },
            { title: 'Enfermedades', data: 'enfermedades' },
            { title: 'Peso', data: 'peso', render: (data) => `${data} Kg` },
            { title: 'Esterilizado', data: 'esterilizado', render: (data) => (data ? 'Sí' : 'No') },
            {
              title: 'Acciones',
              data: 'id_Mascota',
              render: (data) =>
                `<button class="btn-ver-perfil" data-id="${data}">
                  Ver Perfil
                </button>`,
            },
          ],
          language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
          },
          responsive: true,
        });

        // Manejar eventos de botones personalizados
        $(tableRef.current).on('click', '.btn-ver-perfil', function () {
          const idMascota = $(this).data('id');
          verPerfil(idMascota);
        });
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };

    obtenerMascotas();

    return () => {
      // Verificar si DataTable está inicializado antes de destruirlo
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  const verPerfil = (id) => {
    window.location.href = `/verPerfilMascotaG/${id}`;
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: sans-serif;
          background-size: cover;
          background-position: center;
          color: white;
        }

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
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 95%;
          margin: 20px auto;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        table.dataTable {
          width: 100% !important;
          max-width: 100%;
          margin: 20px 0;
          border-collapse: collapse;
          font-size: 1.2rem;
          text-align: center;
        }

        table.dataTable thead th {
          background-color: #28a745;
          color: white;
          font-weight: bold;
          padding: 15px;
          text-align: center;
          vertical-align: middle;
        }

        table.dataTable tbody tr {
          background-color: #f9f9f9;
        }

        table.dataTable tbody tr:hover {
          background-color: #e6ffe6;
        }

        table.dataTable td,
        table.dataTable th {
          padding: 15px;
          text-align: center;
          color: black;
        }

        .btn-ver-perfil {
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          background-color: #1db954;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn-ver-perfil:hover {
          background-color: #1aa34a;
        }

        .dataTables_wrapper .dataTables_length,
        .dataTables_wrapper .dataTables_filter {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .dataTables_wrapper .dataTables_length label,
        .dataTables_wrapper .dataTables_filter label {
          font-size: 1rem;
          font-weight: bold;
          margin-right: 10px;
          color: #333;
        }

        .dataTables_wrapper .dataTables_length select,
        .dataTables_wrapper .dataTables_filter input {
          font-size: 1rem;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .dataTables_wrapper .dataTables_length select {
          width: auto;
        }

        .dataTables_wrapper .dataTables_filter input {
          width: 200px;
        }
      `}</style>
      <div className="page-container">
      <NavBarGerente />
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
      </div>
    </>
  );
};

export default ConsultarMascotas;
