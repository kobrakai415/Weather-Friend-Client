import react from 'react'
import CityContainer from './CityContainer'


interface Props {
    cities: CityForecastData[]
}
const Cities = ({ cities }: Props) => {

    return (
        <div className="d-flex flex-row">
            {cities.map((item, index) => <CityContainer key={index} city={item} />)}
        </div>
    )
}

export default Cities