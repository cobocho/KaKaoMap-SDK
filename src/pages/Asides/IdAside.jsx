import { useDispatch } from 'react-redux';
import AsideViewer from '../../components/AsideViewer/AsideViewer';
import { mapActions } from '../../store/mapSlice';
import { useGetItemByContentsIdQuery } from '../../api/openApi';
import { getConvertedAPIData } from '../../utils/getConvertedAPIData'
import { useParams } from 'react-router';
import { useEffect } from 'react';

const IdAside = () => {
  const dispatch = useDispatch();

  const { id, category } = useParams();
  const { data, isFetching } = useGetItemByContentsIdQuery({id, category});

  const item = data?.body[0];


  useEffect(() => {
    if (item) {
      const { COORD: { X, Y } } = getConvertedAPIData(item);
      const coord = {
        lat: Y, 
        lng: X 
      }
      dispatch(mapActions.setSelectedItemId(id));
      dispatch(mapActions.setCenter(coord));
      dispatch(mapActions.setPosition(coord));
    }
  }, [item]);

  return (
    <AsideViewer>
      {
        isFetching
        ?
        <div>
          Loading...
        </div>
        :
        <div>
          complete
        </div>
      }
    </AsideViewer>
  );
};

export default IdAside;