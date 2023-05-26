import KakaoMap from '../components/Map/KakaoMap';
import styled from 'styled-components';

const MapPageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

const MapPage = () => {
  return (
    <MapPageBox>
      <KakaoMap />
    </MapPageBox>
  );
};

export default MapPage;