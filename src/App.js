import { useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Search from './components/Search';
import Results from './components/Results';
import { getPricesOnly, calculateAverage, formatNumber } from './components/Helpers';
import homeValues from './data/zillow-home-values';
import rentalPrices from './data/zillow-rental-prices';

const App = () => {

    const [activeSearch, setActiveSearch] = useState(false);
    const [location, setLocation] = useState('Not Available');
    const [averageHomeValue, setAverageHomeValue] = useState('Not Available');
    const [averageRentalPrice, setAverageRentalPrice] = useState('Not Available');
    const [grossRentMultiplier, setGrossRentMultiplier] = useState('Not Available');

    const updateResults = (search) => {

        // Get home value data for search, return empty array if no search
        const regex = new RegExp(search, "i");
        const filteredHomeValues = search ? homeValues.filter( home => home.city.match(regex)) : [];
        const filteredRentalPrices = search ? rentalPrices.filter( rental => rental.cityState.match(regex)) : [];

        // In case of multiple results in one location, calculate average home value and rental price
        const homeValuesOnly = getPricesOnly( filteredHomeValues, 'homeValue' );
        const averageHomeValue = calculateAverage( homeValuesOnly );
        const rentalPricesOnly = getPricesOnly( filteredRentalPrices, 'rent' );
        const averageRentalPrice = calculateAverage( rentalPricesOnly );        

        // Update state
        setActiveSearch(true);
        setLocation(search);
        setAverageHomeValue( formatNumber('currency', averageHomeValue) );
        setAverageRentalPrice( formatNumber('currency', averageRentalPrice) );
        setGrossRentMultiplier( formatNumber('percent', averageRentalPrice/averageHomeValue) );
    }

    return (
        <div className="App">
            <Jumbotron>
                <h1>Gross Rent Multiplier</h1>
                <p>Find the Gross Rent Multiplier for a particular area. Search by zip or city + state.</p>
                <Search updateSearchResults = {updateResults} />
            </Jumbotron>
            {
                activeSearch ? (
                    <Results 
                        location = {location}
                        averageHomeValue = {averageHomeValue}
                        averageRentalPrice = {averageRentalPrice}
                        grossRentMultiplier = {grossRentMultiplier}
                    />
                ) : null
            }
        </div>    
    );

}

export default App;