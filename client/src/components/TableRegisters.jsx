import Searcher from "./Searcher"
import ButtonDelete from "./ButtonDelete"
import ButtonEdit from "./ButtonEdit"
import { useState } from "react";

function TableRegisters({ searchRegister, handleSearchChange, filteredRegister, handleEdit, handleDelete }) {

  const [currentPage, setCurrentPage] = useState(1);
  const registersPerPage = 10; // Puedes ajustar este número según necesites

  // Calcular índices para la paginación
  const indexOfLastRegister = currentPage * registersPerPage;
  const indexOfFirstRegister = indexOfLastRegister - registersPerPage;
  const currentRegisters = filteredRegister.slice(indexOfFirstRegister, indexOfLastRegister);

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredRegister.length / registersPerPage);

  // Funciones para navegar entre páginas
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a una página específica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generar números de página para la navegación
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <div className="table-register">
        <h1>Tabla de Estudiantes</h1>
        <Searcher
          value={searchRegister}
          onChange={handleSearchChange}
        />
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {indexOfFirstRegister + 1} - {Math.min(indexOfLastRegister, filteredRegister.length)} de {filteredRegister.length} registros
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>N°</th>
              <th>Aula</th>
              <th>Turno</th>
              <th>Sede</th>
              <th>Sec</th>
              <th>N° Exp</th>
              <th>N° DNI</th>
              <th>Nombres y Apellidos</th>
              <th>Colegio</th>
              <th>Plan</th>
              <th>Cod Op 1</th>
              <th>Cod Op 2</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRegisters.map((register) => (
              <tr key={register.id}>
                <td>{register.id}</td>
                <td>{register.number}</td>
                <td>{register.classroom}</td>
                <td>{register.shift}</td>
                <td>{register.headquarters}</td>
                <td>{register.sec}</td>
                <td>{register.exp}</td>
                <td>{register.dni}</td>
                <td>{register.nameSurname}</td>
                <td>{register.school}</td>
                <td>{register.plan}</td>
                <td>{register.codOp1}</td>
                <td>{register.codOp2}</td>
                <td className="table-actions">
                  <ButtonEdit onClick={() => handleEdit(register)} />
                  <ButtonDelete onClick={() => handleDelete(register.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => goToPage(number)}
              className={`px-3 py-1 text-sm rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  )
}

export default TableRegisters