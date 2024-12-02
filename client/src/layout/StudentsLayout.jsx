import { useState, useEffect } from "react"
import RegisterForm from '../components/RegisterForm'
import TableRegisters from "../components/TableRegisters"

function StudentsLayout() {
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
  const [showPopup, setShowPopup] = useState(false)

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

  useEffect(() => {
    if (filteredRegister.length === 1 && searchRegister.length === 8) {
      setShowPopup(true);

      // Añadir cierre automático
      const timer = setTimeout(() => {
        setShowPopup(false);
        setSearchRegister('');
      }, 2000); // 5 segundos

      // Limpiar el timer si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [filteredRegister, searchRegister]);


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
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-96 max-w-sm">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowPopup(false);
                setSearchRegister('');
              }}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Asistencia Registrada</h3>

            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-gray-900">DNI:</strong> {filteredRegister[0].dni}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Nombre:</strong> {filteredRegister[0].nameSurname}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Clase:</strong> {filteredRegister[0].classroom}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Expediente:</strong> {filteredRegister[0].exp}
              </p>
            </div>
          </div>
        </div>
      )}
      <RegisterForm
        formData={formData}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
      <TableRegisters
        searchRegister={searchRegister}
        handleSearchChange={handleSearchChange}
        filteredRegister={filteredRegister}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      >
      </TableRegisters>
    </>
  )
}

export default StudentsLayout