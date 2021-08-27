import { Container, Row, ListGroup } from 'react-bootstrap'

const Results = (props) => {
	return (
		<Container fluid className="results">
			<Row>
				<ListGroup className="results-list">
					<ListGroup.Item className="location">
						<p><span className="label">Location:</span> {props.location}</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<p><span className="label">Average Home Value:</span> {props.averageHomeValue}</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<p><span className="label">Average Rental Price:</span> {props.averageRentalPrice}</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<p><span className="label">Gross Rent Multiplier:</span> {props.grossRentMultiplier}</p>
					</ListGroup.Item>
				</ListGroup>
			</Row>
		</Container>
	);
}

export default Results;