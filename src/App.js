import { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import Search from './components/Search'
import Results from './components/Results'
import homeValues from "./data/zillow-home-values"
import rentalPrices from "./data/zillow-rental-prices"

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
        console.log(filteredRentalPrices);
        
        // In case of multiple results, create array of all matching home values and rental prices
        const homeValueArray = [];
        const rentalPriceArray = [];
        filteredHomeValues.forEach((home) => {
            homeValueArray.push(home.homeValue);
        });
        filteredRentalPrices.forEach((rental) => {
            rentalPriceArray.push(rental.rent);
        });
        
        // Calculate averages
        const averageHomeValue = homeValueArray.reduce( function (sum, value) {
            return sum + value;
        }, 0) / homeValueArray.length;
        const averageRentalPrice = rentalPriceArray.reduce( function (sum, value) {
            return sum + value;
        }, 0) / rentalPriceArray.length;
        console.log('averageRentalPrice ', averageRentalPrice);

        // Format as currency or percentage
        const formatCurrency = (number) => {
            return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});
        }
        const formatPercentage = (number) => {
            return number.toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2});
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,      
        });

        // Output
        this.setState({  activeSearch: true });
        this.setState({  location: search });
        this.setState({  averageHomeValue: formatCurrency(averageHomeValue) });
        this.setState({  averageRentalPrice: formatCurrency(averageRentalPrice) });
        this.setState({  grossRentMultiplier: formatPercentage(averageRentalPrice/averageHomeValue) });

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
