import { useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Search from './components/Search';
import Results from './components/Results';
import { getPricesOnly, calculateAverage, formatNumber } from './components/Helpers';
import rentalPrices from './data/zillow-rental-prices';

const App = () => {

    const [results, setResults] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false);

    const updateResults = (search) => {
        
        const searchTerm = search[0].city;
        const city = search[0].location;
        const averageHomeValue = search[0].averageHomeValue;

        // Get home value data for search, return empty array if no search
        const regex = new RegExp(searchTerm, "i");
        // const filteredHomeValues = search ? homeValues.filter( item => item.location.match(regex)) : [];
        const filteredRentalPrices = search ? rentalPrices.filter( rental => rental.cityState.match(regex)) : [];

        // In case of multiple results in one location, calculate average home value and rental price
        // const homeValuesOnly = getPricesOnly( filteredHomeValues, 'homeValue' );
        // const averageHomeValue = calculateAverage( homeValuesOnly );
        const rentalPricesOnly = getPricesOnly( filteredRentalPrices, 'rent' );
        const averageRentalPrice = calculateAverage( rentalPricesOnly );        

        // Update state
        setActiveSearch(true);
        const newResultsCard = {
            id: results.length + 1,
            location: city,
            averageHomeValue: formatNumber('currency', averageHomeValue),
            averageRentalPrice: formatNumber('currency', averageRentalPrice),
            grossRentMultiplier: formatNumber('percent', averageRentalPrice/averageHomeValue)
        }
        setResults(results => [...results, newResultsCard]);
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
                    <Results results = {results} />
                ) : null
            }
        </div>    
    );

}

export default App;