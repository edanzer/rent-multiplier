// import Jumbotron from 'react-bootstrap/Jumbotron'
// import Button from 'react-bootstrap/Button'
import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import Search from './components/Search'
import Results from './components/Results'

function App() {
  return (
    <div className="App">
      <Jumbotron>
        <h1>Gross Rent Multiplier</h1>
        <p>
          Find the Gross Rent Multiplier for a particular area. Search by zip or city + state.
        </p>
        <Search />
      </Jumbotron>
      <Results />
    </div>    
  );
}

export default App;
