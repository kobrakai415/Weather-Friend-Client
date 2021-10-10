import react from 'react'

interface Props {
    city: CityForecastData
}

const CityContainer = ({ city }: Props) => {

    return (
        <>
            <h3>{city.city.city}</h3>
        </>
    )
}

export default CityContainer