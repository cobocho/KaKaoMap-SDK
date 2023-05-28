import { Outlet } from 'react-router';
import KakaoMap from '../components/Map/KakaoMap';
import styled from 'styled-components';

const MapPageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .map-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 500px);
    height: 100%;
    margin-left: 500px;
    background-color: #f7f7f7;
  }

  @media (max-width: 900px) {
    .map-layout {
      margin-left: 0;
      width: 100vw;
      height: 65%;
    }
  }
`

const MapPage = () => {
  return (
    <MapPageBox>
      <div className="map-layout">
        <KakaoMap />
      </div>
      <Outlet />
    </MapPageBox>
  );
};

export default MapPage;