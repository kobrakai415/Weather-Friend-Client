interface Weather {
  description: string;
  icon: string;
}
interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}
interface Data {
  main: Main;
  weather: Weather[];
  name: string;
  dt_txt: string;
  wind: { deg: number; gust: number; speed: number };
}

interface Coord {
  lat: number;
  lon: number;
}

interface DailyForecast {
  dt: number;
  weather: Weather[];
  temp: {
    day: number;
    min: number;
    max: number;
  };
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface CityInterface {
  city: string;
  country: string;
}

interface ListItem {
  main: Main;
  weather: Weather[];
}
interface CityData {
  list: ListItem[];
}
interface CityForecastData {
  city: CityInterface;
  data: CityData;
}
