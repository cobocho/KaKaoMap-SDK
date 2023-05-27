const API_KEY = 'ea061e94268b45c0b4ac9859a7b591af';

const PAGE_SIZE = 200;

const getDistance = (lv) => {
  let result = 0;
  const width = window.innerWidth;
  // 데스크탑
  if (width > 900) result = 100;
  // 태블릿
  else if (width > 500) result = 60;
  // 모바일
  else if (width < 500) result = 40;

  for (let i = 1; i < lv; i++) {
    result = result * 2;
  }
  return result;
};

export const getOpenAPIUrlByThemeId = ({ locationData: { coordinate, level }, themeId }) => {
  const distance = getDistance(level);

  const url = `/smgis/apps/theme.do?cmd=getContentsList&key=${API_KEY}&page_size=${PAGE_SIZE}&page_no=1&coord_x=${coordinate.lng}&coord_y=${coordinate.lat}&distance=${distance}&search_type=0&search_name=&theme_id=${themeId}&content_id=&subcate_id=`;

  return url;
};

export const getOpenAPIUrlByContentsId = ({ contentsId, themeId }) => {
  const url = `https://map.seoul.go.kr/smgis/apps/poi.do?cmd=getNewContentsDetail&key=${API_KEY}&theme_id=${themeId}&conts_id=${contentsId}`;
  return url;
};
