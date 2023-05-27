import styled from "styled-components";

const CardBox = styled.div`
  border-radius: 20px;
  box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.2);
  -webkit-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.2);
  overflow: hidden;
`

const Card = ({children, className}) => {
  return (
    <CardBox className={className}>
      {children}
    </CardBox>
  );
};

export default Card;