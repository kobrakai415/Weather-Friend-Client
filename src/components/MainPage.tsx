import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosCloudy } from "react-icons/io"
import { format } from 'date-fns';


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

const MainPage = () => {

    const [query, setQuery] = useState("")
    const [data, setData] = useState<Data[] | []>([])

    const fetchWeather = async () => {

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&cnt=5&appid=${ApiKey}`)

            if (res.ok) {
                const json = await res.json()
                console.log(json.list)
                setData(json.list)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchMap = async () => {
        try {
            const res = await fetch(`http://maps.openweathermap.org/maps/2.0/weather/{cl}/{10}/{10}/{10}?appid=${ApiKey}`)

            const json = await res.json()

            console.log(json)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (query.length > 2) {
            fetchMap()
            fetchWeather();
        }
    }, [query])



    return (
        <>
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col xs={12}>
                        <div id="search-bar-parent">
                            <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Check the weather ..." />
                            <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                            </svg>
                        </div>
                    </Col>

                    {data.length > 0 &&
                        <Col xs={12} className="mt-4">

                            <div className="d-flex flex-column">
                                <h4 className="p-2">
                                    {query}
                                </h4>

                                <div className="d-flex p-2">
                                    <div className="pe-3" style={{ borderRight: "solid" }}>
                                        <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${data[0].weather[0]?.icon}@2x.png`} />

                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="d-flex ms-2 flex-column">
                                            <h6>{data[0].main.temp_max}°</h6>
                                            <h6>{data[0].main.temp_min}°</h6>
                                        </div>

                                        <h6 className="ps-3">
                                            {data[0].weather[0]?.description}
                                        </h6>
                                    </div>
                                </div>

                            </div>



                        </Col>

                    }

                    <Col >
                        <Row>

                            {data.slice(1, 5).map((day, index) => {

                                return (
                                    <Col key={index} xs={12} md={3}>
                                        <div className="d-flex flex-column">
                                            <h4 className="p-2">
                                                {format(new Date(day.dt_txt), "p")}
                                            </h4>

                                            <div className="d-flex p-2">
                                                <div className="pe-3" style={{ borderRight: "solid" }}>
                                                    <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`} />

                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <div className="d-flex ms-2 flex-column">
                                                        <h6>{day.main.temp_max} °</h6>
                                                        <h6>{day.main.temp_min}°</h6>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>

                </Row>
            </Container>


        </>

    );
}

export default MainPage;
