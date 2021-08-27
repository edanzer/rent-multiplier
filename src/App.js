import { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Search from './components/Search';
import Results from './components/Results';
import homeValues from './data/zillow-home-values';
import rentalPrices from './data/zillow-rental-prices';

var unirest = require('unirest');

class App extends Component {

    state = {
        activeSearch: false,
        location: 'Not Specified',
        averageHomeValue: 'Not Specified',
        averageRentalPrice: 'Not Specified',
        grossRentMultiplier: 'Not Specified',
    }

    updateResults = (search) => {

        // Get home value data for search, return empty array if no search
        const regex = new RegExp(search, "i");
        const filteredHomeValues = search ? homeValues.filter( home => home.city.match(regex)) : [];
        const filteredRentalPrices = search ? rentalPrices.filter( rental => rental.cityState.match(regex)) : [];

        // In case of multiple results in one location, calculate average home value and rental price
        const homeValuesOnly = this.getPricesOnly( filteredHomeValues, 'homeValue' );
        const rentalPricesOnly = this.getPricesOnly( filteredRentalPrices, 'rent' );
        const averageHomeValue = this.calculateAverage( homeValuesOnly );
        const averageRentalPrice = this.calculateAverage( rentalPricesOnly );        

        // Update state
        this.setState({ activeSearch: true });
        this.setState({ location: search });
        this.setState({ averageHomeValue: this.formatNumber('currency', averageHomeValue) });
        this.setState({ averageRentalPrice: this.formatNumber('currency', averageRentalPrice) });
        this.setState({ grossRentMultiplier: this.formatNumber('percent', averageRentalPrice/averageHomeValue) });

    }

    getPricesOnly = ( startingArray, propertyName ) => {
        const newArray = [];
        for (let i = 0; i < startingArray.length;  i++) {
            newArray.push( startingArray[i][propertyName]);
        }
        return newArray;
    }

    calculateAverage = ( array ) => {
        const average = array.reduce( function (sum, value) {
            return sum + value;
        }, 0) / array.length;
        return average;
    }

    formatNumber = ( type, number ) => {
        if ( 'currency' == type ) {
            return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});
        } else if ( 'percent' == type ) {
            return number.toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2});
        }
    }

    render () {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>Gross Rent Multiplier</h1>
                    <p>Find the Gross Rent Multiplier for a particular area. Search by zip or city + state.</p>
                    <Search updateSearchResults = {this.updateResults} />
                </Jumbotron>
                {
                    this.state.activeSearch ? (
                        <Results 
                            location = {this.state.location}
                            averageHomeValue = {this.state.averageHomeValue}
                            averageRentalPrice = {this.state.averageRentalPrice}
                            grossRentMultiplier = {this.state.grossRentMultiplier}
                        />
                    ) : null
                }
                
            </div>    
        );
    }
  
}

export default App;
