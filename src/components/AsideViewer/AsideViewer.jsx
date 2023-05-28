import { useState } from 'react';
import LinkButton from "./LinkButton";
import styled from 'styled-components';
import Card from '../UI/Card';
import ThemeSelector from './ThemeSelector';

const AsideViewBox = styled.aside`
  display: flex;
  position: absolute;
  left: 0;
  width: 500px;
  height: 100vh;
  padding: 40px 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.2);
  -webkit-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.2);
  z-index: 999;

  .bigger {
    display: none;
    position: absolute;
    top: 10px;
    right: 5px;
    color: #8c8c8c;
    font-weight: 800;
    background-color: transparent;
    border: none;
  }
  
  .nav-links {
    min-width: 70px;
    height: fit-content;
    margin-right: 10px;
    padding: 10px;
    background-color: #323232;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100vw;
    height: 35%;
    position: fixed;
    bottom: 0;
    padding: 30px 10px 10px 10px;
    transition: all 1s;

    &.big-mode {
      height: 100%;
    }

    .bigger {
      display: block;
    }

    .nav-links {
      position: fixed;
      bottom: 10px;
      left: 0;
      display: flex;
      width: calc(100% - 20px);
      height: fit-content;
      margin: 0 10px;
    }

    .nav-links nav {
      display: flex;
      justify-content: space-around;
      gap: 10px;
      width: 100%;
      height: 50px;
    }
  }
`

const AsideViewer = ({children}) => {
  const [isBigger, setIsBigger] = useState(false);

  return (
    <AsideViewBox className={isBigger ? 'big-mode' : ''}>
      <ThemeSelector />
      <Card className="nav-links">
        <nav>
          <LinkButton href={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
              <path d="M12 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 16l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789.495-2.021.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731l4.021 1.588 3.936 9z"/>
            </svg>
          </LinkButton>
          <LinkButton href={'/boards'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M0 1v16.981h4v5.019l7-5.019h13v-16.981h-24zm13 12h-8v-1h8v1zm6-3h-14v-1h14v1zm0-3h-14v-1h14v1z"/></svg>
          </LinkButton>
          <LinkButton href={'/shop'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="M9.939 0l-.939 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l2.996-4.971h1.943zm-3.052 0l-2.887 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l4.874-4.971h2.013zm17.113 6.068c0 1.067-.934 1.932-2 1.932s-2-.933-2-2v-1.098l-2.887-4.902h2.014l4.873 4.971v1.097zm-10-1.168v1.098c0 1.066-.934 2.002-2 2.002-1.067 0-2-.933-2-2v-1.098l1.047-4.902h1.905l1.048 4.9zm2.004-4.9l2.994 5.002v1.098c0 1.067-.932 1.9-1.998 1.9s-2-.933-2-2v-1.098l-.939-4.902h1.943zm4.996 12v7h-18v-7h18zm2-2h-22v14h22v-14z"/>
              </svg>
          </LinkButton>
          <LinkButton href={'/user'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg>
          </LinkButton>
        </nav>
      </Card>
      <button className='bigger' onClick={() => {
        setIsBigger(!isBigger);
      }}>
        {isBigger ? '축소' : '확대'}
      </button>
      {children}
    </AsideViewBox>
  );
};

export default AsideViewer;