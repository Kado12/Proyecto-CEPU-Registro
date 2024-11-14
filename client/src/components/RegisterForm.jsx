import ButtonSave from "./ButtonSave"

const RegisterForm = ({ formData, isEditing, handleInputChange, handleSubmit, resetForm }) => {
  return (
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
  )
}

export default RegisterForm