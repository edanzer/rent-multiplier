import { useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Search from './components/Search';
import Results from './components/Results';
import { formatNumber } from './components/Helpers';
import rentalPrices from './data/rental-prices';

const App = () => {

    const [results, setResults] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false);

    const updateResults = (search) => {
        
        // Get city and average home value from search
        const location = search[0].location;
        const averageHomeValue = search[0].averageHomeValue;

        // Get average rental price from rental price data
        const regex = new RegExp(location, "i");
        const matchingLocation = rentalPrices.filter( item => item.location.match(regex));
        const averageRentalPrice = matchingLocation.length >= 1 ? matchingLocation[0].rent : "Not Available";

        // Calculate gross rent multiplier
        const grossRentMultiplier = matchingLocation.length >= 1 ? averageRentalPrice/averageHomeValue : "Not Available";
        
        // Update state
        setActiveSearch(true);
        const newResultsCard = {
            id: results.length + 1,
            location: location,
            averageHomeValue: formatNumber('currency', averageHomeValue),
            averageRentalPrice: formatNumber('currency', averageRentalPrice),
            grossRentMultiplier: formatNumber('percent', grossRentMultiplier)
        }
        setResults(results => [...results, newResultsCard]);
    }

    const removeLocation = (id) => {
        const newResults = results.filter( item => item.id !== id );
        setResults(newResults);
    }

    return (
        <div className="App">
            <Jumbotron>
                <h1>Gross Rent Multiplier</h1>
                <p>Find the average gross multiplier by city.</p> 
                <p>To start, select a city and click submit. To compare cities, just repeat.</p>
                <Search updateSearchResults = {updateResults} />
            </Jumbotron>
            {
                activeSearch ? (
                    <Results 
                        results = {results} 
                        removeLocation = {removeLocation} 
                    />
                ) : <h1>Select a city above to start.</h1>
            }
        </div>    
    );

}

export default App;