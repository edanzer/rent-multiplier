import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Search = (props) => {
	const [search, setSearch] = useState('');

	const handleSubmit = e => {
		e.preventDefault()
		props.updateSearchResults(search)
	}

	return (
		<Form inline onSubmit={handleSubmit.bind(this)}>
			<Form.Group controlId="formSearchArea">
				<Form.Control 
					type="search" 
					placeholder="Enter search terms" 
					className="mr-sm-2"
					value = {search}
					onChange = {e => setSearch(e.target.value)}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">Submit</Button>
		</Form>
	);
}

export default Search;