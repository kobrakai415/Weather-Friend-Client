import react from 'react'
import Ticker from 'react-ticker'
import CityContainer from './CityContainer'
import Citiess from './Cities'


interface Props {
    cities: CityForecastData[]
}
const CitiesTicker = ({ cities }: Props) => {

    return (
        <Ticker  speed={10}>

            {() => <Citiess cities={cities} />}

        </Ticker>
    )
}

export default CitiesTicker