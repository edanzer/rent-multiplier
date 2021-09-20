import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Search from './components/Search';
import Results from './components/Results';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

const App = () => {

    const results = useSelector((state: RootState) => state.results.value)

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Rently</Navbar.Brand>
                            {/* <LinkContainer to="/"><Nav.Link>Rently</Nav.Link></LinkContainer> */}
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path="/">
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
                </Route>
                <Route path="/about">
                    <Container fluid className="results">
                        <p>This is the about page.</p>
                    </Container>
                </Route>
            </Switch>
        </Router>  
    );

}

export default App;