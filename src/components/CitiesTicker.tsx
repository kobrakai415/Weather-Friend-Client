import react from 'react'
import Ticker from 'react-ticker'
import CityContainer from './CityContainer'

interface Props {
    cities: CityForecastData[]
}
const CitiesTicker = ({ cities }: Props) => {

    return (
        <Ticker speed={10}>

            {() => cities.map(item => <CityContainer city={item} />)}

        </Ticker>
    )
}

export default CitiesTicker