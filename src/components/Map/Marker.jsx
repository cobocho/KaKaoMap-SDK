import styled from "styled-components";
import { OPEN_API_CODES } from "../../constants/openAPI_codes";

const MarkerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #000000;
  opacity: 0.4;
  fill: #fff;
  transition: transform 0.3s;

  &.selected, &:hover {
    transform: scale(1.4);
    opacity: 1;
  }
`

const MedicineSVG = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.598 11.456c1.466 1.193 2.402 3.01 2.402 5.044 0 3.587-2.913 6.5-6.5 6.5-.817 0-1.599-.151-2.32-.427l6.418-11.117zm-11.903 8.409l-.363.634c-1.38 2.391-4.441 3.211-6.831 1.831-2.391-1.38-3.211-4.441-1.831-6.831l6.873-11.998c.931-1.613 2.626-2.511 4.365-2.501.839.005 1.688.221 2.466.67 1.842 1.063 2.752 3.125 2.441 5.108-.069.437-.196.869-.386 1.287-.98.124-1.909.415-2.756.843l.799-1.407c.828-1.434.336-3.271-1.098-4.099-1.434-.828-3.271-.335-4.099 1.099l-3.372 5.935 3.978 2.296c-.563 1.136-.879 2.415-.879 3.767 0 1.195.247 2.334.693 3.366zm3.75 1.714c-1.49-1.192-2.445-3.025-2.445-5.079 0-3.587 2.913-6.5 6.5-6.5.837 0 1.637.158 2.372.447l-6.427 11.132z"/>
    </svg>
  )
}

const ElectronicSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path d="M8 24l3-9h-9l14-15-3 9h9l-14 15z"/>
    </svg>
  )
}

const MedicineMarker = ({ onClick, className, theme}) => {
  if (theme === OPEN_API_CODES.MEDICINES.THEME_ID) {
    return (
      <MarkerBox onClick={onClick} className={className}>
        <MedicineSVG />
      </MarkerBox>
    )
  }
  if (theme === OPEN_API_CODES.ELECTRONIC.THEME_ID) {
    return (
      <MarkerBox onClick={onClick} className={className}>
        <ElectronicSVG />
      </MarkerBox>
    )
  }
  return (
    <MarkerBox onClick={onClick} className={className}>
    </MarkerBox>
  );
};

export default MedicineMarker;