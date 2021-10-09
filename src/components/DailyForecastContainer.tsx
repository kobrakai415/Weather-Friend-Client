import { setDay } from 'date-fns/esm'
import react, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { format } from 'date-fns'


interface Props {
    day: DailyForecast

}
const DailyForecastContainer = ({ day }: Props) => {

    const [date, setDate] = useState<Date | null>(null)

    useEffect(() => {
        // dt is date in unix
        const daysDate: Date = new Date(1000 * day.dt)
        setDate(daysDate)
    }, [])

    return (
        <Col className="my-1 my-md-4 slide-in-left" xs={12} md={3}>
            {date && <h3 className="px-2 py-2">{format(date, "EEEE")}</h3>}
            <div className="d-flex flex-column light-bg p-2">
                <div className="d-flex justify-content-end" >
                    <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`} />

                </div>
                <div className="d-flex flex-column p-2 pb-md-4 ps-md-4">
                    {/* <span className="text-muted time-text">
                        {format(new Date(day.dt_txt), "p")}
                    </span> */}

                    <div className="d-flex temp-text ">
                        <span >{day.temp.day}</span> <span className="ps-1 yellow-text">°C</span>

                    </div>
                    <span className="time-text" >{day.weather[0]?.description}</span>


                </div>
            </div>
        </Col>
    )
}

export default DailyForecastContainer