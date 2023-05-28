import { useDispatch } from 'react-redux';
import AsideViewer from '../../components/AsideViewer/AsideViewer';
import { mapActions } from '../../store/mapSlice';
import { useGetItemByContentsIdQuery } from '../../api/openApi';
import { getConvertedAPIData } from '../../utils/getConvertedAPIData'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { OPEN_API_CODES } from '../../constants/openAPI_codes';
import Button from '../../components/UI/Button';

const ItemDesc = styled.div`
  flex-grow: 1;
  width: 100%;
  padding: 20px;

  h2 {
    margin-bottom: 10px;
  }
  
  p {
    margin-bottom: 10px;
  }

  .btns {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
`

const IdAside = () => {
  const dispatch = useDispatch();

  const { id, category } = useParams();
  const { data, isFetching } = useGetItemByContentsIdQuery({id, category});
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (data?.body[0]) {
      const { COORD: { X, Y } } = getConvertedAPIData(data?.body[0]);
      const coord = {
        lat: Y, 
        lng: X 
      }
      dispatch(mapActions.setSelectedItemId(id));
      dispatch(mapActions.setCenter(coord));
      dispatch(mapActions.setPosition(coord));
      setItem(getConvertedAPIData(data?.body[0]));
    }
  }, [data]);

  return (
    <AsideViewer>
      {
        isFetching
        ?
        <div>
          Loading...
        </div>
        :
        <ItemDesc>
          <h2>
            {item?.THEME_ID === OPEN_API_CODES.MEDICINES.THEME_ID ? '폐의약품 수거함' : '폐건전지, 폐형광등 분리수거함'}
          </h2>
          <div className="btns">
            <Button>배출방법</Button>
            <Button>게시판</Button>
          </div>
          <div className="info">
            <p>
              <strong>ID</strong> {item?.ID}
            </p>
            <p>
              <strong>위치</strong> {item?.ADDRESS}
            </p>
            <p>
              <strong>관할 전화번호</strong> {item?.TEL}
            </p>
          </div>
        </ItemDesc>
      }
    </AsideViewer>
  );
};

export default IdAside;