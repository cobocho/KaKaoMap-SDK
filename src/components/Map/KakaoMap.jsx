import { CustomOverlayMap, Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { DEFAULT_LEVEL } from "../../constants/coordinate";
import { useNavigate } from "react-router-dom";
import Marker from "./Marker";
import styled from "styled-components";
import { useGetElectronicsQuery, useGetMedicinesQuery } from "../../api/openApi";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/mapSlice";
import { OPEN_API_CODES, OPEN_API_ITEM_CODES } from "../../constants/openAPI_codes";
import { getConvertedAPIData } from "../../utils/getConvertedAPIData";


const MapBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

        // 영역에 보이는 마커만 목록에 세팅
        onCreate={(map) => {
          const bounds = map.getBounds();
          const inBounds = allData.filter((data) => {
            const marker = new kakao.maps.LatLng(data[OPEN_API_ITEM_CODES.COORD.Y], data[OPEN_API_ITEM_CODES.COORD.X]);
            return bounds.contain(marker);
          });
          dispatch(mapActions.setVisibleItemList(inBounds));
        }}

        // 지도 이동 이벤트
        onDragEnd={(map) => {
          dispatch(mapActions.setPosition({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng()
          }));
          dispatch(mapActions.setSelectedItemId(null));
          dispatch(mapActions.setHoveredItemId(null));

          // 영역에 보이는 마커만 목록에 세팅
          const bounds = map.getBounds();
          const inBounds = allData.filter((data) => {
            const marker = new kakao.maps.LatLng(data[OPEN_API_ITEM_CODES.COORD.Y], data[OPEN_API_ITEM_CODES.COORD.X]);
            return bounds.contain(marker);
          });

          dispatch(mapActions.setVisibleItemList(inBounds));

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

          const bounds = map.getBounds();
          const inBounds = allData.filter((data) => {
            const marker = new kakao.maps.LatLng(data[OPEN_API_ITEM_CODES.COORD.Y], data[OPEN_API_ITEM_CODES.COORD.X]);
            return bounds.contain(marker);
          });

          dispatch(mapActions.setVisibleItemList(inBounds));

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
  );
};

export default KakaoMap;