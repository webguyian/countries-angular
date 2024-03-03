export const API_BASE_URL = 'https://restcountries.com/v3.1';

export const ROUTES = {
  home: {
    path: '',
    name: 'home'
  },
  detail: {
    path: 'country/:id',
    name: 'detail'
  }
};

export const REGIONS = [
  'Africa',
  'Americas',
  'Antarctic',
  'Asia',
  'Europe',
  'Oceania'
];

export const REGION_KEY = 'region';
export const SEARCH_KEY = 'search';
