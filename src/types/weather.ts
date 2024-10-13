export interface WeatherCityData {
  current: WeatherCurrentData;
  forecast: WeatherResponse;
  groupByDay: Record<string, WeatherData[]>;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}

export interface WeatherData {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain; // Optional since not every entry may have rain
  sys: Sys;
  dt_txt: string;
}

export interface WeatherCurrentData {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

interface LocalNames {
  km?: string;
  es?: string;
  de?: string;
  he?: string;
  id?: string;
  ko?: string;
  fr?: string;
  zh?: string;
  eo?: string;
  oc?: string;
  cs?: string;
  ar?: string;
  it?: string;
  et?: string;
  fa?: string;
  nl?: string;
  vi?: string;
  en?: string;
  ms?: string;
  el?: string;
  ja?: string;
  lv?: string;
  ru?: string;
}

export interface City {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
}
