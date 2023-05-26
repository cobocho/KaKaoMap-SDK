const API_KEY = 'ea061e94268b45c0b4ac9859a7b591af';

const PAGE_SIZE = 200;

const getDistance = (lv) => {
  switch (lv) {
    case 5:
      return 2400;
    case 6:
      return 4800;
    case 7:
      return 9600;
    default:
      return 1200;
  }
};

export const getOpenAPIUrl = ({ coordinate, level }) => {
  const distance = getDistance(level);

  const url = `https://map.seoul.go.kr/smgis/apps/theme.do?cmd=getContentsList&key=${API_KEY}&page_size=${PAGE_SIZE}&page_no=1&coord_x=${coordinate.lng}&coord_y=${coordinate.lat}&distance=${distance}&search_type=0&search_name=%ED%8F%90%EC%9D%98%EC%95%BD%ED%92%88&theme_id=1649132420936&content_id=&subcate_id=`;

  return url;
};
