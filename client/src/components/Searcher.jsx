import styled from 'styled-components'

const Searcher = ({ value, onChange }) => {


  return (
    <StyledWrapper>
      <input placeholder="Search..." className="input" name="text" type="text" value={value} onChange={onChange} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    padding: 10px;
    width: 120px;
    border: none;
    outline: none;
    border-radius: 5px;
    box-shadow: 0 1px  gray;
    font-size: 18px;
    transition: width 0.3s;
    font-family: Consolas,monaco,monospace;
  }

  .input:focus {
    outline: 1px solid blue;
    box-shadow: none;
    width: 230px;
  }

  .input::placeholder {
    color: blue;
  }`;

export default Searcher