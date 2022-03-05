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
        <Form.Group as={Row} className="mb-3" controlId="origin">
          <Form.Label column sm="2">Origin</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="destination">
        <Form.Label column sm="2">Destination</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="departure">
        <Form.Label column sm="2">Departure</Form.Label>
        <Col sm="10">
          <Form.Control
            type="datetime-local"
            placeholder="Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button variant={buttonVariant} type="button" onClick={() => onSubmit(origin, destination, departure)}>
        {buttonText}
      </Button>
    </Form>
  );
}
