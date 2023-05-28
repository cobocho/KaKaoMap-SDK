import styled from 'styled-components';

const LayoutBox = styled.main`
  position: relative;
  height: 100vh;
  background-color: #ffffff;

  @media (max-width: 1720px) {
    width: 100vw;
    height: 100vh;
  }
`

const Layout = (props) => {
  return (
    <LayoutBox>
      {props.children}
    </LayoutBox>
  );
};

export default Layout;