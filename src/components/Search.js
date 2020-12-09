import React from 'react'
import { Form, Button } from 'react-bootstrap'

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = { search: "" };
	}

	handleChange(event) {
		this.setState({ search: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(`https://dog.ceo/api/breeds/list/all`)
			.then( response => response.json() )
			.then( data => {
				if ( Object.keys(data.message).some( item => this.state.search === item ) ) {
					console.log('true');
					fetch(`https://dog.ceo/api/breed/${this.state.search}/images/random/5`)
						.then( response => response.json() )
						.then( data => {
							data.message.forEach(element => console.log(element));
						});
				} else {
					alert('try again - not a valid breed!');
				}
			})
			.catch(function(err) {
			 	console.log('Fetch Error :-S', err);
			});

	}

	render () {
		return (
			<Form inline onSubmit={this.handleSubmit.bind(this)}>
				<Form.Group controlId="formSearchArea">
					<Form.Control 
						type="search" 
						placeholder="Enter search terms" 
						className="mr-sm-2"
						value={this.state.name}
              			onChange={this.handleChange.bind(this)}
              		/>
				</Form.Group>
				<Button variant="primary" type="submit">Submit</Button>
			</Form>
		)
	}
}

export default Search;

