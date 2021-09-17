// Import third party resources
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, ListGroup, CloseButton } from 'react-bootstrap';

// Import app resources
import { RootState } from "../app/store";
import { removeLocation } from "../features/resultsSlice";
import { LocationCard } from "../types/types";

const Results = () => {

	const results = useSelector((state: RootState) => state.results.value);
    const dispatch = useDispatch();

	const removeLocationCard = (id: number) => {
		dispatch(removeLocation(id));
	}

	return (
		<Container fluid className="results">
			<Row>
				{
                    results.map( (item: LocationCard) => (
                        <ListGroup key={item.id} className="results-card">
							<ListGroup.Item className="location">
								<p>{item.location}</p>
								<CloseButton 
									className="remove-button" 
									onClick={() => removeLocationCard(item.id)}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<p><span className="label">Average Home Value:</span> {item.averageHomeValue}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<p><span className="label">Average Rental Price:</span> {item.averageRent}</p>
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