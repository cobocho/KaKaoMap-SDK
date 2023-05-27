import styled from "styled-components";
import Item from "./Item";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/mapSlice";
import { getConvertedAPIData } from "../../utils/getConvertedAPIData";

const ListBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
`

const ItemList = ({allData}) => {
  const dispatch = useDispatch();
  if (allData.length === 0) {
    return <ListBox>Nothing</ListBox>
  }
  return (
    <ListBox>
      {
        allData.map(item => {
          const { ID } = getConvertedAPIData(item);
          return (
            <li key={ID}>
              <Item 
                item={item}
                onMouseEnter={
                  () => {
                    dispatch(mapActions.setHoveredItemId(ID))
                  }
                }
                onMouseLeave={
                  () => {
                    dispatch(mapActions.setHoveredItemId(null))
                  }
                }
            >
              </Item>
            </li>
          )
      })
      }
    </ListBox>
  );
};

export default ItemList;