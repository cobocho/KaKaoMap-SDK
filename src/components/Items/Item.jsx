import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from '../UI/Card'
import { OPEN_API_CODES, OPEN_API_ITEM_CODES } from "../../constants/openAPI_codes";
import { getConvertedAPIData } from "../../utils/getConvertedAPIData";

const ItemBox = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  padding: 20px;

  h3 {
    margin-bottom: 10px;
  }

  img {
    width: 100px;
    height: 100px;
  }

  em {
    font-style: normal;
    font-weight: 700;
  }

  .address {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    word-break: keep-all;
  }

  .address2 {
  }

  &:hover {
    cursor: pointer;
    background-color: #eaeaea;
  }
`

const Item = ({ item, onMouseEnter, onMouseLeave }) => {
  const { THEME_ID, ADDRESS } = getConvertedAPIData(item);
  const title = THEME_ID === OPEN_API_CODES.ELECTRONIC.THEME_ID ? '폐건전지, 폐형광등 분리수거함' : "폐의약품 회수함"
  const category = THEME_ID === OPEN_API_CODES.ELECTRONIC.THEME_ID ? 'electronic' : "medicine"

  return (
    <Link to={`/${category}/${item[OPEN_API_ITEM_CODES.ID]}`}>
      <Card>
        <ItemBox
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <h3>
          {title}
          </h3>
          <p className="address">
            <em>상세주소</em>
            {ADDRESS}
          </p>
          <p className="address2">
          </p>
        </ItemBox>
      </Card>
    </Link>
  );
};

export default Item;