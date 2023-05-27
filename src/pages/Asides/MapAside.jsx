import { useSelector } from 'react-redux';
import AsideViewer from '../../components/AsideViewer/AsideViewer';
import ItemList from '../../components/Items/ItemList';

const MapAside = () => {
  const medicineList = useSelector((state) => state.medicine.medicineList);
  const electronicList = useSelector((state) => state.electronic.electronicList);

  const isMedicineSelected = useSelector((state) => state.medicine.selected);
  const isElectronicSelected = useSelector((state) => state.electronic.selected);

  const allData = [];

  if (isMedicineSelected)  {
    allData.push(...medicineList);
  }

  if (isElectronicSelected)  {
    allData.push(...electronicList);
  }
  
  return (
    <AsideViewer>
      {
        allData && <ItemList allData={allData} />
      }
      
    </AsideViewer>
  );
};

export default MapAside;