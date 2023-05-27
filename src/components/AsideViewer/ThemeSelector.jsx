import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { electronicActions } from '../../store/elcetronicSlice';
import { medicineActions } from '../../store/medicineSlice';

const ThemeSelectorBox = styled.div`
  display: flex;
  position: absolute;
  top: 13px;
  right: 30px;

  label {
    margin-right: 20px;
    font-weight: 300;
  }

  input {
    margin-right: 6px;
  }
`

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const isMedicineSelected = useSelector((state) => state.medicine.selected);
  const isElectronicSelected = useSelector((state) => state.electronic.selected);

  return (
    <ThemeSelectorBox>
        <label>
          <input 
            type="checkbox" 
            name="electronic" 
            checked={isElectronicSelected} 
            onChange={() => {
              dispatch(electronicActions.toggleSelected());
            }}
          />
          폐건전지, 폐형광등
        </label>
        <label>
          <input 
            type="checkbox" 
            name="medicine" 
            checked={isMedicineSelected}
            onChange={() => {
              dispatch(medicineActions.toggleSelected());
            }}
          />
          폐의약품
        </label>
    </ThemeSelectorBox>
  );
};

export default ThemeSelector;