import { Form, Button } from 'react-bootstrap'

function Search() {
  return (
    <Form>
    	<Form.Group controlId="formSearchArea">
			<Form.Control type="text" placeholder="Search" />
		</Form.Group>
		<Button variant="primary" type="submit">Submit</Button>
	</Form>
  );
}

export default Search;

