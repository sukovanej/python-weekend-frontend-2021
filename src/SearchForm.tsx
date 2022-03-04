import { Form, Button, Row, Col } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";

interface SearchFormProps {
  onSubmit: (
    origin: string,
    destination: string,
    departure: string
  ) => void;
  origin: string;
  setOrigin: (_: string) => void;
  destination: string;
  setDestination: (_: string) => void;
  departure: string;
  setDeparture: (_: string) => void;
  fetchInProgress: boolean;
}

export default function SearchForm({ onSubmit,
  origin,
  setOrigin,
  destination,
  setDestination,
  departure,
  setDeparture,
  fetchInProgress,
}: SearchFormProps): JSX.Element {
  const buttonText = fetchInProgress ? 'Fetching...' : 'Search';
  const buttonVariant: ButtonVariant = fetchInProgress ? 'outline-success' : 'success';

  return (
    <Form>
      <Row>
        <Form.Group className="mb-3" controlId="origin">
          <Col><Form.Label>Origin</Form.Label></Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="destination">
        <Form.Label>Destination</Form.Label>
        <Form.Control
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="departure">
        <Form.Label>Departure</Form.Label>
        <Form.Control
          type="datetime-local"
          placeholder="Departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
      </Form.Group>

      <Button variant={buttonVariant} type="button" onClick={() => onSubmit(origin, destination, departure)}>
        {buttonText}
      </Button>
    </Form>
  );
}
