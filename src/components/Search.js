import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class Search extends Component {

	state = {
		search: ''
	}

	handleChange = event => {
		this.setState({ search: event.target.value });
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.updateSearchResults(this.state.search)
	}

	render () {
		return (
			<Form inline onSubmit={this.handleSubmit.bind(this)}>
				<Form.Group controlId="formSearchArea">
					<Form.Control 
						type="search" 
						placeholder="Enter search terms" 
						className="mr-sm-2"
						value = {this.state.search}
						onChange = {this.handleChange}
              		/>
				</Form.Group>
				<Button variant="primary" type="submit">Submit</Button>
			</Form>
		)
	}
}

export default Search;

