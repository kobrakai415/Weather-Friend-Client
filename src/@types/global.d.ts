interface Weather {
    description: string,
    icon: string
}
interface Data {
    main: {
        temp: number
        temp_min: number
        temp_max: number
    }
    weather: Weather[]
    name: string
    dt_txt: string
}

interface Coord {
    lat: number
    lon: number
}

interface DailyForecast {
    dt: number
    weather: Weather[]
    temp: {
        day: number
        min: number
        max: number
    }
    wind_deg: number
    wind_gust: number
    wind_speed: number
}