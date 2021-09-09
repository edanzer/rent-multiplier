import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import data from '../data/data';

const Search = (props) => {
  	const [singleSelection, setSingleSelection] = useState([]);

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