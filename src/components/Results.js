import { ListGroup } from 'react-bootstrap'
import { Component } from 'react'

class Results extends Component {
	render() {
		return (
			<ListGroup>
				{this.props.resultsList.map((item, index) =>
    				<ListGroup.Item key={index}><img src={item} /></ListGroup.Item>
				)}
			</ListGroup>
		);
	}
}

export default Results;