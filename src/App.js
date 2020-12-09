// import Jumbotron from 'react-bootstrap/Jumbotron'
// import Button from 'react-bootstrap/Button'
import { Button, Jumbotron } from 'react-bootstrap'
import Search from './components/search'

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
    </div>
  );
}

export default App;
