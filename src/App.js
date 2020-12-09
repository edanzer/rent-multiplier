import { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import Search from './components/Search'
import Results from './components/Results'

class App extends Component {
    state = {
        resultsList: ['1','2','3']
    }

    updateResults = (search) => {
        fetch(`https://dog.ceo/api/breeds/list/all`)
            .then( response => response.json() )
            .then( data => {
                if ( Object.keys(data.message).some( item => search === item ) ) {
                    fetch(`https://dog.ceo/api/breed/${search}/images/random/5`)
                        .then( response => response.json() )
                        .then( data => {
                            this.setState({ 
                                resultsList: data.message
                            });
                        });
                } else {
                    alert('try again - not a valid breed!');
                }
            })
            .catch(function(err) {
                console.log('There was an error: ', err);
            });           
    }

    render () {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>Gross Rent Multiplier</h1>
                    <p>Find the Gross Rent Multiplier for a particular area. Search by zip or city + state.</p>
                    <Search updateSearchResults = {this.updateResults} />
                </Jumbotron>
                <Results resultsList = {this.state.resultsList} />
            </div>    
        );
    }
  
}

export default App;
