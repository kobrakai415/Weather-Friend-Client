import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ThreeHourForecastContainer from './ThreeHourForecastContainer'
import CurrentWeather from './CurrentWeather';
import DailyForecastContainer from './DailyForecastContainer';
import CitiesTicker from './CitiesTicker';


const ApiUrl = process.env.REACT_APP_API_URL
const ApiKey = process.env.REACT_APP_API_KEY


const cities: CityInterface[] = [
    {
        city: "London",
        country: "United Kingdom"
    },
    {
        city: "Barcelona",
        country: "Spain"
    },
    {
        city: "Paris",
        country: "United Kingdom"
    },
    {
        city: "Berlin",
        country: "Germany"
    },
    {
        city: "Rome",
        country: "Italy"
    },
    {
        city: "Zurich",
        country: "Switzerland"
    }
]


const MainPage = () => {

    const [query, setQuery] = useState("")
    const [dailyForecast, setDailyForecast] = useState<Data[] | []>([])
    const [cityCoord, setCityCoord] = useState<Coord | null>(null)
    const [fourDayForecast, setFourDayForecast] = useState<DailyForecast[] | []>([])
    const [citiesForecasts, setCitiesForecasts] = useState<CityForecastData[] | []>([])


    const fetchTodaysWeather = async () => {

        try {

            const res = await fetch(`${ApiUrl}/forecast?q=${query.length > 2 ? query : "london"}&units=metric&cnt=5&appid=${ApiKey}`)

            if (res.ok) {
                const json = await res.json()
                setCityCoord(json.city.coord)
                console.log(json)
                console.log(json.list)
                setDailyForecast(json.list)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetch4DayForecast = async () => {
        try {
            const res = await fetch(`${ApiUrl}/onecall?lat=${cityCoord ? cityCoord.lat : "51.5085"}&lon=${cityCoord ? cityCoord.lon : "-0.1257"}&exclude=hourly&units=metric&appid=${ApiKey}`)
            console.log(res)
            if (res.ok) {
                const json = await res.json()
                console.log(json)
                setFourDayForecast(json.daily)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCityForecast = async (city: string) => {
        try {
            const res = await fetch(`${ApiUrl}/forecast?q=${city}&units=metric&cnt=5&appid=${ApiKey}`)

            if (res.ok) {
                const json = await res.json()
                console.log(json)

            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchCityForecasts = async (cities: CityInterface[]) => {
        try {

            let results: CityForecastData[] = []

            cities.map(async (item) => {

                const res = await fetch(`${ApiUrl}/forecast?q=${item.city}&units=metric&cnt=5&appid=${ApiKey}`)
                if (res.ok) {
                    const json = await res.json()
                    console.log(json)
                    results.push(
                        {
                            data: json,
                            city: {
                                city: item.city,
                                country: item.country
                            }
                        }
                    )
                }

            })

            setCitiesForecasts(results)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(ApiKey)
        fetchCityForecasts(cities)
    }, [])

    useEffect(() => {
        fetchTodaysWeather();
    }, [query])

    useEffect(() => {
        fetch4DayForecast();
    }, [cityCoord])


    return (
        <>
            <Container className="p-3" style={{ minHeight: "100vh" }}>
                <Row>
                    <Col xs={12}>
                        <div className="py-3 my-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img className="me-3" width="50px" src="/walk.png" alt="logo" />
                                <h1 className="mb-0">Weather Friend</h1>
                            </div>

                            <div className="d-flex align-items-center nav-items">
                                <img className="me-2" height="35px" width="40px" src="/favorite.png" alt="favourites" />
                                <img height="27px" width="27px" src="/user.png" alt="user" />

                            </div>

                        </div>
                    </Col>
                    <Col xs={12}>
                        {citiesForecasts.length > 0 ? <CitiesTicker cities={citiesForecasts} /> : null}
                        
                    </Col>
                    <Col xs={12}>
                        <div className="mt-3" id="search-bar-parent">
                            <input className="ligh-bg" type="text" id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tell me the weather in ..." />
                            <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                            </svg>
                        </div>
                    </Col>
                </Row>



                {dailyForecast.length > 0 ?
                    <>
                        <Row>
                            <CurrentWeather currentWeather={dailyForecast[0]} query={query} />
                        </Row>

                        <Row className="light-bg p-3 mx-0 slide-in-left ">
                            {dailyForecast.slice(1, 5).map((forecast, index) => {
                                return (
                                    <ThreeHourForecastContainer key={index} forecast={forecast} />
                                )
                            })}
                        </Row>
                    </>
                    : null
                }

                <Row>
                    {fourDayForecast.length > 0 ?
                        fourDayForecast.slice(1, 5).map((day, index) => <DailyForecastContainer day={day} key={index} />)
                        : null
                    }
                </Row>

            </Container >


        </>

    );
}

export default MainPage;
