import styled from "styled-components";
import { NavLink } from "react-router-dom";

const LinkBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 10px;
  border-radius: 14px;
  overflow: hidden;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    transition: all 0.5s;
  }

  a:hover {
    background-color: #d3d3d3;
    cursor: pointer;
  }

  a.selected {
    background-color: #7fee00;
  }

  svg {
    fill: #000000;
  }

  @media (max-width: 900px) {
    width: auto;
    height: 100%;
    aspect-ratio: 1/1;
    margin-bottom: 0;
  }
`

const LinkButton = ({href, children}) => {
  return (
    <LinkBox>
      <NavLink to={href} className={({ isActive }) => (isActive ? "selected" : "")}>
        {children}
      </NavLink>
    </LinkBox>
  );
};

export default LinkButton;