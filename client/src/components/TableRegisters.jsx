import { useState, useEffect } from "react"
import ButtonSave from "./ButtonSave"
import Searcher from "./Searcher"
import ButtonDelete from "./ButtonDelete"
import ButtonEdit from "./ButtonEdit"

function TableRegisters() {
  const [searchRegister, setSearchRegister] = useState('')
  const [registers, setRegisters] = useState([])
  const [selectedRegister, setSelectedRegister] = useState(null)
  const [formData, setFormData] = useState({
    number: '',
    classroom: '',
    shift: '',
    headquarters: '',
    sec: '',
    exp: '',
    dni: '',
    nameSurname: '',
    school: '',
    plan: '',
    codOp1: '',
    codOp2: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSearchChange = (event) => {
    setSearchRegister(event.target.value)
  }

  const filteredRegister = registers.filter((register) => {
    return (
      register.nameSurname.toLowerCase().includes(searchRegister.toLowerCase()) ||
      register.dni.toString().includes(searchRegister) ||
      register.exp.toString().includes(searchRegister)
    )
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchRegisters()
  }, [])

  // Obtener todos los registros
  const fetchRegisters = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/register`)
      const data = await response.json()
      setRegisters(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Crear nuevo registro
  const handleCreate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al crear el registro')
      }

      const newRegister = await response.json()
      setRegisters([...registers, newRegister])
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Actualizar registro
  const handleUpdate = async () => {
    if (!selectedRegister) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/register/${selectedRegister.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el registro');
      }

      const updatedRegister = await response.json();
      setRegisters(registers.map(register =>
        register.id === selectedRegister.id ? updatedRegister : register
      ));
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Eliminar registro
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/register/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el registro');
      }

      setRegisters(registers.filter(register => register.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Preparar item para edición
  const handleEdit = (item) => {
    setSelectedRegister(item);
    setFormData(item);
    setIsEditing(true);
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      number: '',
      classroom: '',
      shift: '',
      headquarters: '',
      sec: '',
      exp: '',
      dni: '',
      nameSurname: '',
      school: '',
      plan: '',
      codOp1: '',
      codOp2: ''
    });
    setSelectedRegister(null);
    setIsEditing(false);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  return (
    <>
      <div className="form-new-register">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nameSurname"
            value={formData.nameSurname}
            onChange={handleInputChange}
            placeholder="Nombres y Apellidos"
          />
          <input
            type="text"
            name="shift"
            value={formData.shift}
            onChange={handleInputChange}
            placeholder="Turno"
          />
          <input
            type="text"
            name="headquarters"
            value={formData.headquarters}
            onChange={handleInputChange}
            placeholder="Sede"
          />
          <input
            type="text"
            name="exp"
            value={formData.exp}
            onChange={handleInputChange}
            placeholder="Expediente"
          />
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
            placeholder="N° DNI"
          />
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            placeholder="Escuela"
          />
          <input
            type="text"
            name="plan"
            value={formData.plan}
            onChange={handleInputChange}
            placeholder="Plan"
          />
          <input
            type="text"
            name="codOp1"
            value={formData.codOp1}
            onChange={handleInputChange}
            placeholder="Cod. Operación 1"
          />
          <input
            type="text"
            name="codOp2"
            value={formData.codOp2}
            onChange={handleInputChange}
            placeholder="Cod. Operación 2"
          />
          {isEditing ? <ButtonSave type="submit"></ButtonSave> : <button type="submit">Crear</button>}
          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </form>
      </div>
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