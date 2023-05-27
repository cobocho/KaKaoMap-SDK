import { getOpenAPIUrlByContentsId, getOpenAPIUrlByThemeId } from '../utils/getOpenAPIUrl';
import { OPEN_API_CODES } from './openAPI_codes';

export const OPEN_API_URL = {
  SEOUL: {
    BASE_URL: 'https://map.seoul.go.kr',
    CONTENTS: {
      URL: ({ id, category }) => {
        const themeId =
          category === 'medicine'
            ? OPEN_API_CODES.MEDICINES.THEME_ID
            : OPEN_API_CODES.ELECTRONIC.THEME_ID;
        return getOpenAPIUrlByContentsId({
          contentsId: id,
          themeId,
        });
      },
    },
    MEDICINES: {
      URL: (locationData) => {
        return getOpenAPIUrlByThemeId({
          locationData,
          themeId: OPEN_API_CODES.MEDICINES.THEME_ID,
        });
      },
    },
    ELECTRONIC: {
      URL: (locationData) => {
        return getOpenAPIUrlByThemeId({
          locationData,
          themeId: OPEN_API_CODES.ELECTRONIC.THEME_ID,
        });
      },
    },
  },
};
