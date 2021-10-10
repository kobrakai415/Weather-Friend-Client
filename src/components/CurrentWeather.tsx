import react from 'react'
import { Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';

interface Props {
    currentWeather: Data
    query: string
}



const CurrentWeather = ({ currentWeather, query }: Props) => {


    return (
        <Col xs={12} className="my-3 slide-in-left">
            <h1 className="p-2 text-capitalize">
                {query.length > 2 ? query : "London"}
            </h1>

            <Row className="light-bg mx-0 p-3">
                <Col lg={6}>
                    <div >
                        <div className=" text-capitalize d-flex flex-row justify-content-between align-items-center">
                            <strong className="today">Today</strong> <span className="me-5">{format(new Date(), "EEE, d MMM")}</span>
                        </div>
                        <div className="d-flex">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="temp-text-big ms-2 ">
                                    <span>{currentWeather.main.temp} </span><span className="yellow-text">°C</span>

                                </div>

                                <h6 className="ps-3">
                                    {currentWeather.weather[0]?.description}
                                </h6>
                            </div>
                            <div className="pe-3" >
                                <img className="img-fluid" height="200px" width="200px" src={`http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`} />

                            </div >
                        </div >

                    </div >
                </Col >
            </Row >
        </Col >
    )
}

export default CurrentWeather