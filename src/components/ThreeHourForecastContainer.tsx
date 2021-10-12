import React from 'react'
import { Col } from 'react-bootstrap'
import { format } from 'date-fns'

interface MyProps {
    forecast: Data
}
const Container = ({ forecast }: MyProps) => {



    return (
        <Col xs={12} sm={6} lg={3}>

            <div className="d-flex align-items-center justify-content-center" >
                <div className="d-flex flex-column px-1">

                    <span className="text-muted time-text">
                        {format(new Date(forecast.dt_txt), "p")}
                    </span>
                    <div className="d-flex temp-text ">
                        <span >{forecast.main.temp}</span> <span className="ps-1 yellow-text">°C</span>
                    </div>
                    <span className="time-text" >{forecast.weather[0]?.description}</span>

                </div>
                <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`} />

            </div>

        </Col>
    )
}

export default Container