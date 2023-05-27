import { CustomOverlayMap, Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { DEFAULT_LEVEL } from "../../constants/coordinate";
import { useNavigate } from "react-router-dom";
import Marker from "./Marker";
import styled from "styled-components";
import { useGetElectronicsQuery, useGetMedicinesQuery } from "../../api/openApi";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/mapSlice";
import Card from "../UI/Card";
import { OPEN_API_CODES } from "../../constants/openAPI_codes";
import { getConvertedAPIData } from "../../utils/getConvertedAPIData";

const AppearAnimation = styled.div`
  opacity: 0;
  animation: appear 0.5s forwards;
  
  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const MapBox = styled.div`
  position: relative;
  height: 800px;
  aspect-ratio: 1/1;

  @media (max-width: 900px) {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 500px) {
    width: 350px;
    height: 350px;
  }
`

const Loadingbox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-weight: 800;
  z-index: 999;
  opacity: 0.3;
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #e2e2e2;

  .buttons {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 20px;
  }

  .fake-button {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 50%;
  }

  .fake-button:nth-child(1) {
    background-color: #d94c4c;
  }

  .fake-button:nth-child(2) {
    background-color: #d8b800;
  }

  .fake-button:nth-child(3) {
    background-color: #29920e;
  }
`

const KakaoMap = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 좌표 관련 상태
  const position = useSelector(state => state.map.position);
  const level = useSelector(state => state.map.level);
  const center = useSelector(state => state.map.center);

  const isMedicineSelected = useSelector(state => state.medicine.selected);
  const isElectronicsSelected = useSelector(state => state.electronic.selected);

  const locationData = {
    coordinate: { ...position },
    level
  }

  const selectedItemId = useSelector(state => state.map.selectedItemId);
  const hoveredItemId = useSelector(state => state.map.hoveredItemId);

  const { data: medicineData, isFetching: medicineIsFetching } = useGetMedicinesQuery(locationData, {
    skip: !isMedicineSelected,
  });

  const { data: electroninData, isFetching: electroninDataIsFetching } = useGetElectronicsQuery(locationData, {
    skip: !isElectronicsSelected
  });

  const allData = [];

  if (!medicineIsFetching) allData.push(...medicineData.body);
  if (!electroninDataIsFetching) allData.push(...electroninData.body);
  
  const isFetching = medicineIsFetching || electroninDataIsFetching;

  return (
    <AppearAnimation>
      <Card>
        <Bar>
          <div className="buttons">
            <div className="fake-button" />
            <div className="fake-button" />
            <div className="fake-button" />
          </div>
        </Bar>
        <MapBox>
          <Map
            center={center.coord}
            isPanto={center.isPanto}
            maxLevel={4}
            style={{
              width: "100%",
              height: "100%",
            }}
            level={DEFAULT_LEVEL}
            // 지도 이동 이벤트
            onDragEnd={(map) => {
              dispatch(mapActions.setPosition({
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng()
              }));
              dispatch(mapActions.setSelectedItemId(null));
              navigate(`/`);
              }
            }
            // 줌 변경 이벤트
            onZoomChanged={(map) => {
              dispatch(mapActions.setPosition({
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng()
              }));
              dispatch(mapActions.setLevel(map.getLevel()));
              navigate(`/`);
            }}
          >
            <MarkerClusterer
              averageCenter={true}
              minClusterSize={2}
              minLevel={3}
            >
            {
              !isFetching
              &&
              allData.map((item) => {
                const { THEME_ID, ID, COORD: { X, Y } } = getConvertedAPIData(item);
                if (THEME_ID === OPEN_API_CODES.MEDICINES.THEME_ID && !isMedicineSelected) return;
                if (THEME_ID === OPEN_API_CODES.ELECTRONIC.THEME_ID && !isElectronicsSelected) return;
                return (
                  <CustomOverlayMap
                    key={ID}
                    position={{
                      lat: Y, 
                      lng: X,
                    }}
                  >
                    <Marker 
                      className={ 
                        ID === selectedItemId || ID === hoveredItemId
                        ? 
                        'selected' 
                        : 
                        '' }
                      theme={THEME_ID}
                      onClick={
                        () => {
                          const category = THEME_ID === OPEN_API_CODES.MEDICINES.THEME_ID ? 'medicine' : 'electronics';
                          dispatch(mapActions.setLevel(2));
                          navigate(`/${category}/${ID}`);
                        }
                      }
                    />
                  </CustomOverlayMap>
                )
              })
            }
            </MarkerClusterer>
          </Map>
          {isFetching && <Loadingbox>Loading...</Loadingbox>}
        </MapBox>
      </Card>
    </AppearAnimation>
  );
};

export default KakaoMap;