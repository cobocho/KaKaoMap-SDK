import { useSelector } from 'react-redux';
import AsideViewer from '../../components/AsideViewer/AsideViewer';
import ItemList from '../../components/Items/ItemList';
import { OPEN_API_CODES, OPEN_API_ITEM_CODES } from '../../constants/openAPI_codes';

const MapAside = () => {
  let allItem = useSelector((state) => state.map.visibleItemList);
  const isMedicineSelected = useSelector((state) => state.medicine.selected);
  const isElectronicSelected = useSelector((state) => state.electronic.selected);

  if (!isMedicineSelected)  {
    allItem = allItem.filter(item => item[OPEN_API_ITEM_CODES.THEME_ID] !== OPEN_API_CODES.MEDICINES.THEME_ID);
  }

  if (!isElectronicSelected)  {
    allItem = allItem.filter(item => item[OPEN_API_ITEM_CODES.THEME_ID] !== OPEN_API_CODES.ELECTRONIC.THEME_ID);
  }
  
  return (
    <AsideViewer>
      {
        allItem && <ItemList allData={allItem} />
      }
      
    </AsideViewer>
  );
};

export default MapAside;