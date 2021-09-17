import { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { formatNumber } from './components/Helpers';

interface LocationData {
    id: number;
    location: string;
    averageHomeValue: number;
    averageRent: number|null;
    grossRentMultiplier: number|null;
}   

interface LocationResult {
    id: number;
    location: string;
    averageHomeValue: string;
    averageRent: string;
    grossRentMultiplier: string;
}   

const App = () => {

    

    const [results, setResults] = useState<LocationResult[]>([]);
    const [activeSearch, setActiveSearch] = useState(false);

    const updateResults = (search: LocationData[]) => {
        
        // Get city, home value, rent. Calculate gross rent multiplier.
        const location = search[0].location;
        const averageHomeValue = search[0].averageHomeValue;
        const averageRent = search[0].averageRent ? search[0].averageRent : null;
        const grossRentMultiplier = averageRent ? averageRent/averageHomeValue : null;
        
        // Update state
        setActiveSearch(true);
        const newLocationCard: LocationResult = {
            id: results.length + 1,
            location: location,
            averageHomeValue: formatNumber('currency', averageHomeValue),
            averageRent: averageRent ? formatNumber('currency', averageRent) : "Not Available",
            grossRentMultiplier: grossRentMultiplier ? formatNumber('percent', grossRentMultiplier) : "Not Available"
        }
        setResults(prevResults => [...prevResults, newLocationCard]);
    }

    const removeLocation = (currentResults: LocationResult[], id: number) => {
        const newResults = currentResults.filter( item => item.id !== id );
        setResults(newResults);
    }

    return (
        <div className="App">
            <header className="header">
                <h1>Gross Rent Multiplier</h1>
                <p>Find the average gross multiplier by city.</p> 
                <p>To start, select a city and click submit. To compare cities, just repeat.</p>
                <Search updateResults = {updateResults} />
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