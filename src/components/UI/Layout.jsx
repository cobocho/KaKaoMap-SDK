import styled from 'styled-components';

const LayoutBox = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`

const Layout = (props) => {
  return (
    <LayoutBox>
      {props.children}
    </LayoutBox>
  );
};

export default Layout;