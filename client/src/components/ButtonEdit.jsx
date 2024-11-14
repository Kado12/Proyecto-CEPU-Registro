import styled from 'styled-components'

const ButtonEdit = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="noselect" onClick={onClick}><span className="text">Editar</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 24 24"><path d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z" /><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2" /></svg></span></button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   width: 150px;
   height: 50px;
   cursor: pointer;
   display: flex;
   align-items: center;
   background: red;
   border: none;
   border-radius: 5px;
   box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
   background: #009900;
  }

  button, button span {
   transition: 200ms;
  }

  button .text {
   transform: translateX(35px);
   color: white;
   font-weight: bold;
  }

  button .icon {
   position: absolute;
   border-left: 1px solid #c41b1b;
   transform: translateX(110px);
   height: 40px;
   width: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
  }

  button svg {
   width: 15px;
   fill: #eee;
  }

  button:hover {
   background: #008000;
  }

  button:hover .text {
   color: transparent;
  }

  button:hover .icon {
   width: 150px;
   border-left: none;
   transform: translateX(0);
  }

  button:focus {
   outline: none;
  }

  button:active .icon svg {
   transform: scale(0.8);
  }`;

export default ButtonEdit;
