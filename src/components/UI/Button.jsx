import styled from "styled-components";

const ButtonBox = styled.button`
  min-width: 100px;
  height: 30px;
  padding-top: 4px;
  background-color: #ededed;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  transition: all 0.3s;

  &:hover {
    background-color: #dadada;
    cursor: pointer;
  }
`

const Button = ({children, onClick}) => {
  return (
    <ButtonBox onClick={onClick}>
      {children}
    </ButtonBox>
  );
};

export default Button;