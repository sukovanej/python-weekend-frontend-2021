import { Form, Button } from "react-bootstrap";

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
}

export default function SearchForm({ onSubmit,
  origin,
  setOrigin,
  destination,
  setDestination,
  departure,
  setDeparture
}: SearchFormProps): JSX.Element {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="origin">
        <Form.Label>Origin</Form.Label>
        <Form.Control
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </Form.Group>

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

      <Button variant="primary" type="button" onClick={() => onSubmit(origin, destination, departure)} style={{ backgroundColor: "#CC231E", border: "0px" }}>
        Search
      </Button>
    </Form>
  );
}
