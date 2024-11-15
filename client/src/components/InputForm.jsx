import './InputForm.css'

const InputForm = ({ type, name, value, onChange, placeholder }) => {
  return (
    <div className="group-input-form">
      <input type={type} className="input-form" name={name} value={value} onChange={onChange} />
      <span className="highlight" />
      <span className="bar" />
      <label>{placeholder}</label>
    </div>
  )
}

export default InputForm