// Import third party resources
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Import app resources
import { RootState } from "../app/store";
import { addLocation } from "../features/resultsSlice";
import { LocationData, LocationCard } from "../types/types";
import { formatNumber } from './Helpers';

const Search = () => {

	const results = useSelector((state: RootState) => state.results.value);
    const dispatch = useDispatch();

  	const [singleSelection, setSingleSelection] = useState([]);
	const [data, setData] = useState([]);
	
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('https://prhbo9omna.execute-api.us-east-1.amazonaws.com/getData');
			const data = await response.json();
			setData(data);
		}
		fetchData();
	}, []);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		updateResults(singleSelection);
		setSingleSelection([])
	}
	
	const updateResults = (search: LocationData[]) => {
		const location = search[0].location;
		const averageHomeValue = search[0].averageHomeValue;
		const averageRent = search[0].averageRent ? search[0].averageRent : null;
		const grossRentMultiplier = averageRent ? averageRent/averageHomeValue : null;
		
		const newLocationCard: LocationCard = {
			id: results.length + 1,
			location: location,
			averageHomeValue: formatNumber('currency', averageHomeValue),
			averageRent: averageRent ? formatNumber('currency', averageRent) : "Not Available",
			grossRentMultiplier: grossRentMultiplier ? formatNumber('percent', grossRentMultiplier) : "Not Available"
		
		}

		dispatch(addLocation(newLocationCard));
	}

	return (
		<Form inline onSubmit={handleSubmit.bind(this)} className="search-box">
			<Form.Group controlId="formSearchArea">
				<Typeahead
					id="basic-typeahead-multiple"
					//@ts-ignore
					labelKey="location"
					onChange={setSingleSelection}
					options={data}
					placeholder="Choose Location"
					selected={singleSelection}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">Submit</Button>
		</Form>
	);
}

export default Search;