import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosCloudy } from "react-icons/io"
import { format } from 'date-fns';
import ThreeHourForecastContainer from './ThreeHourForecastContainer'

const ApiUrl = process.env.REACT_APP_API_URL
const ApiKey = process.env.REACT_APP_API_KEY

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

const MainPage = () => {

    const [query, setQuery] = useState("")
    const [dailyForecast, setDailyForecast] = useState<Data[] | []>([])
    const [cityCoord, setCityCoord] = useState<Coord | null>(null)
    const [fourDayForecast, setFourDayForecast] = useState([])

    const fetchTodaysWeather = async () => {

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query.length > 2 ? query : "london"}&units=metric&cnt=5&appid=${ApiKey}`)

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
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&units=metric&appid=${ApiKey}`)
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
                    <h1>Weather Forecast</h1>
                    <Col xs={12}>
                        <div id="search-bar-parent">
                            <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Check the weather ..." />
                            <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                            </svg>
                        </div>
                    </Col>

                    {dailyForecast.length > 0 &&
                        <Col xs={12} className="my-4 slide-in-left">
                            <h1 className="p-2 text-capitalize">
                                {query.length > 2 ? query : "London"}
                            </h1>

                            <Row className="light-bg mx-0 p-3">
                                <Col lg={6}>
                                    <div className="d-flex flex-column ">

                                        <div className=" text-capitalize d-flex flex-row justify-content-between align-items-center">
                                            <strong className="today">Today</strong> <span className="me-5">{format(new Date(), "EEE, d MMM")}</span>
                                        </div>
                                        <div className="d-flex">

                                            <div className="d-flex flex-column justify-content-center">
                                                <div className="temp-text-big ms-2 ">
                                                    <span>{dailyForecast[0].main.temp} </span><span className="yellow-text">°C</span>

                                                </div>

                                                <h6 className="ps-3">
                                                    {dailyForecast[0].weather[0]?.description}
                                                </h6>
                                            </div>
                                            <div className="pe-3" >
                                                <img className="img-fluid" height="200px" width="200px" src={`http://openweathermap.org/img/wn/${dailyForecast[0].weather[0]?.icon}@2x.png`} />

                                            </div >
                                        </div >

                                    </div >
                                </Col >

                            </Row >
                        </Col >

                    }



                    {
                        dailyForecast.slice(1, 5).map((forecast, index) => {

                            return (
                                <ThreeHourForecastContainer key={index} forecast={forecast} />
                            )
                        })
                    }

                </Row >
            </Container >


        </>

    );
}

export default MainPage;
