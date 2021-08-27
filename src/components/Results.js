import { Container, Row, ListGroup } from 'react-bootstrap'
import { Component } from 'react'

class Results extends Component {
	render() {
		return (
			
			<Container fluid className="results">
				<Row>
					<ListGroup className="results-list">
						<ListGroup.Item className="location">
							<p><span className="label">Location:</span> {this.props.location}</p>
						</ListGroup.Item>
						<ListGroup.Item>
				  			<p><span className="label">Average Home Value:</span> {this.props.averageHomeValue}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<p><span className="label">Average Rental Price:</span> {this.props.averageRentalPrice}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<p><span className="label">Gross Rent Multiplier:</span> {this.props.grossRentMultiplier}</p>
						</ListGroup.Item>
					</ListGroup>
				</Row>
			</Container>
		);
	}
}

export default Results;