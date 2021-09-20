import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { LocalRentData } from "./pages/LocalRentData";
import { About } from "./pages/About";
import { SignUp } from "./pages/SignUp";
import { GrossRentMultiplier } from "./pages/gross-rent-multiplier";

const App = () => {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/gross-rent-multiplier">
                    <GrossRentMultiplier/>
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