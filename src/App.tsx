import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Search from './components/Search';
import Results from './components/Results';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { LocalRentData } from "./pages/LocalRentData";
import { About } from "./pages/About";
import { SignUp } from "./pages/SignUp";

const App = () => {

    const results = useSelector((state: RootState) => state.results.value)

    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/gross-rent-multiplier">
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
                <Route path="/local-rent-data">
                    <LocalRentData/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/sign-up">
                    <SignUp/>
                </Route>
            </Switch>
        </Router>  
    );

}

export default App;