import react from 'react'

interface Props {
    city: CityForecastData
}

const CityContainer = ({ city }: Props) => {

    return (
        <div className=" light-bg mx-2 city-container p-3 d-flex flex-row justify-content-between align-items-center">
            <div>
                <h5 className="mb-0" >{city.city.city}</h5>
                <span className="text-muted">{city.city.country}</span>
                <div className="d-flex temp-text2 ">
                    <span >{city.data.list[0].main.temp}</span> <span className="ps-1 yellow-text">°C</span>

                </div>
            </div>
                    <img width="50px" src={`http://openweathermap.org/img/wn/${city.data.list[0].weather[0]?.icon}@2x.png`} />
        </div>
    )
}

export default CityContainer