import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import Search from './components/Search';
import Results from './components/Results';

const App = () => {

    const results = useSelector((state: RootState) => state.results.value)
    const dispatch = useDispatch();

    const removeLocation = (id: number) => {
        dispatch(removeLocation(id));
    }

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
                    <Results 
                        results = {results} 
                        removeLocation = {removeLocation} 
                    />
                ) : <h1>Select a city above to start.</h1>
            }
        </div>    
    );

}

export default App;