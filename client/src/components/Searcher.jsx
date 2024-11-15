import './Searcher.css'

const Searcher = ({ value, onChange }) => {
  return (
    <input placeholder="Search..." className="input-search" name="text" type="text" value={value} onChange={onChange} />
  )
}

export default Searcher