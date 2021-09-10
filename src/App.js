import { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { formatNumber } from './components/Helpers';

const App = () => {

    const [results, setResults] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false);

    const updateResults = (search) => {
        
        // Get city, home value, rent. Calculate gross rent multiplier.
        const location = search[0].location;
        const averageHomeValue = search[0].averageHomeValue;
        const averageRent = search[0].averageRent ? search[0].averageRent : "Not Available";
        const grossRentMultiplier = search[0].averageRent ? averageRent/averageHomeValue : "Not Available";
        
        // Update state
        setActiveSearch(true);
        const newResultsCard = {
            id: results.length + 1,
            location: location,
            averageHomeValue: formatNumber('currency', averageHomeValue),
            averageRentalPrice: formatNumber('currency', averageRent),
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
            <header className="header">
                <h1>Gross Rent Multiplier</h1>
                <p>Find the average gross multiplier by city.</p> 
                <p>To start, select a city and click submit. To compare cities, just repeat.</p>
                <Search updateSearchResults = {updateResults} />
            </header>
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