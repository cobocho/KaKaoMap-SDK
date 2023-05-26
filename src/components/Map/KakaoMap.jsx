import { CustomOverlayMap, Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { BASE_COORD, DEFAULT_LEVEL } from "../../constants/coordinate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { getOpenAPIUrl } from "../../utils/getOpenAPIUrl";
import PillMarker from "./PillMarker";
import styled from "styled-components";

const MapBox = styled.div`
  width: calc(100vw - 500px);
  height: 100vh;
  margin-left: 500px;
`

const Loadingbox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-100%);
  width: 400px;
  height: 400px;
  margin-left: 500px;
  font-size: 40px;
  font-weight: 800;
  z-index: 999;
  opacity: 0.3;
  animation: appear 0.3s;
`

const KakaoMap = () => {
  const [center, setCenter] = useState({
    center: BASE_COORD,
    isPanto: true,
  });
  const [position, setPosition] = useState(BASE_COORD);
  const [pillList, setPillList] = useState([]);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const { isLoading, error, sendRequest } = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    const url = getOpenAPIUrl({ coordinate: position, level: level });
    sendRequest({ url }, setPillList);
  }, [position, level]);

  function markerClickHandler(coord) {
    setCenter({
      center: coord.center,
      isPanto: true,
    });
    setPosition({
      lat: coord.center.lat,
      lng: coord.center.lng
    });
    const url = getOpenAPIUrl({ coordinate: position, level: level });
    sendRequest({ url }, setPillList);
    navigate('/map/');
  }

  return (
    <>
      <MapBox>
        <Map
          center={center.center}
          isPanto={center.isPanto}
          maxLevel={5}
          style={{
            width: "100%",
            height: "100%",
          }}
          level={DEFAULT_LEVEL}
          onDragEnd={(map) => setPosition({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })}
          onZoomChanged={(map) => setLevel(map.getLevel())}
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={3}
          >
          {
            isLoading || error
            ?
            <Loadingbox>
              Loading...
            </Loadingbox>
            :
            pillList.body.map((item) => {
              return (
                <CustomOverlayMap
                  key={item.COT_CONTS_ID}
                  position={{
                    lat: +item.COT_COORD_Y, 
                    lng: +item.COT_COORD_X
                  }}
                >
                  <PillMarker onClick={
                    () => {
                      console.log(item);
                      markerClickHandler({
                        center: { lat: +item.COT_COORD_Y, lng: +item.COT_COORD_X },
                        isPanto: true,
                      })
                    }
                  }/>
                </CustomOverlayMap>
              )
            })
          }
          </MarkerClusterer>
        </Map>
      </MapBox>
    </>
  );
};

export default KakaoMap;