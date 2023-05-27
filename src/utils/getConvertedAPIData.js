import { OPEN_API_ITEM_CODES } from '../constants/openAPI_codes';

export const getConvertedAPIData = (data) => {
  const result = {
    COORD: {
      X: data[OPEN_API_ITEM_CODES.COORD.X],
      Y: data[OPEN_API_ITEM_CODES.COORD.Y],
    },
    ADDRESS: data[OPEN_API_ITEM_CODES.ADDRESS],
    THEME_ID: data[OPEN_API_ITEM_CODES.THEME_ID],
    ID: data[OPEN_API_ITEM_CODES.ID],
    TEL: data[OPEN_API_ITEM_CODES.TEL],
  };

  return result;
};
