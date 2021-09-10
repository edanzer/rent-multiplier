import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Search = (props) => {
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

	const handleSubmit = e => {
		e.preventDefault();
		props.updateSearchResults(singleSelection);
		setSingleSelection([])
	}

	return (
		<Form inline onSubmit={handleSubmit.bind(this)} className="search-box">
			<Form.Group controlId="formSearchArea">
				<Typeahead
					id="basic-typeahead-multiple"
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