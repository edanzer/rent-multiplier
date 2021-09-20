import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Results from './Results';
import Search from './Search';

export const GrossRentMultiplier = () => {

    const results = useSelector((state: RootState) => state.results.value);

    return (
        <div className="App">
            <header className="header">
                <h1>Gross Rent Multiplier</h1>
                <p>Find the average gross multiplier by city.</p> 
                <p>To start, select a city and click submit. To compare cities, just repeat.</p>
                <Search />
            </header>
            {
                results.length > 0 ? (
                    <Results />
                ) : <h1>Select a city above to start.</h1>
            }
        </div>
    )
}
