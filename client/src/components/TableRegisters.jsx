import Searcher from "./Searcher"
import ButtonDelete from "./ButtonDelete"
import ButtonEdit from "./ButtonEdit"

function TableRegisters({ searchRegister, handleSearchChange, filteredRegister, handleEdit, handleDelete }) {

  return (
    <>
      <div className="table-register">
        <h1>Tabla de Estudiantes</h1>
        <Searcher
          value={searchRegister}
          onChange={handleSearchChange}
        ></Searcher>
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
            {filteredRegister.map((register) => {
              return (
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
                    <ButtonEdit onClick={() => handleEdit(register)}></ButtonEdit>
                    <ButtonDelete onClick={() => handleDelete(register.id)}></ButtonDelete>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableRegisters