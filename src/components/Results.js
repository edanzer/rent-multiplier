import { Container, Row, ListGroup, CloseButton } from 'react-bootstrap'

const Results = (props) => {
	return (
		<Container fluid className="results">
			<Row>
				{
                    props.results.map( (item) => (
                        <ListGroup key={item.id} className="results-card">
							<ListGroup.Item className="location">
								<p>{item.location}</p>
								<CloseButton 
									className="remove-button" 
									onClick={() => props.removeLocation(item.id)}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<p><span className="label">Average Home Value:</span> {item.averageHomeValue}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<p><span className="label">Average Rental Price:</span> {item.averageRentalPrice}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<p><span className="label">Gross Rent Multiplier:</span> {item.grossRentMultiplier}</p>
							</ListGroup.Item>
						</ListGroup>
                    ))
                }
			</Row>
		</Container>
	);
}

export default Results;