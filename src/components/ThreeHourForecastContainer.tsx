import React from 'react'
import { Col } from 'react-bootstrap'
import { format } from 'date-fns'


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

interface MyProps {
    forecast: Data
}
const Container = ({ forecast }: MyProps) => {



    return (
        <Col className="my-1 my-md-4 slide-in-left" xs={12} md={3}>
            <div className="d-flex flex-column light-bg p-2">


                <div className="d-flex justify-content-end" >
                    <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`} />

                </div>

                <div className="d-flex flex-column p-2 pb-md-4 ps-md-4">
                    <span className="text-muted time-text">
                        {format(new Date(forecast.dt_txt), "p")}
                    </span>

                    <div className="d-flex temp-text ">
                        <span >{forecast.main.temp}</span> <span className="ps-1 yellow-text">°C</span>

                    </div>
                    <span className="time-text" >{forecast.weather[0]?.description}</span>


                </div>


            </div>
        </Col>
    )
}

export default Container