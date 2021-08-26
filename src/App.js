import { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import Search from './components/Search'
import Results from './components/Results'
//import * as data from "./data/zillow-home-values"
import data from "./data/zillow-home-values"

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
        const results = search ? data.filter( home => home.city.match(regex)) : [];
        console.log(results);
        
        // In case of multiple results, create array of home prices
        const homePriceArray = [];
        results.forEach((home) => {
            console.log('home ', home.homeValue);
            homePriceArray.push(home.homeValue);
        });
        
        // Calculate average
        const averagePrice = homePriceArray.reduce( function (sum, value) {
            return sum + value;
        }, 0) / homePriceArray.length;

        // Format as currency
        const formatCurrency = (number) => {
            return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});
        }

        // Output
        this.setState({  activeSearch: true });
        this.setState({  location: search });
        this.setState({  averageHomeValue: formatCurrency(averagePrice) });
        console.log(this.state.activeSearch);
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
