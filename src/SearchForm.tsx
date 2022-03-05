import { Form, Button, Row, Col } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import FormControlWhisperer from "./FormControlWhisperer";

interface SearchFormProps {
  onSubmit: (origin: string, destination: string, departure: string) => void;
  origin: string;
  setOrigin: (_: string) => void;
  destination: string;
  setDestination: (_: string) => void;
  departure: string;
  setDeparture: (_: string) => void;
  fetchInProgress: boolean;
  onWhisperFail: (e: any) => void;
}

export default function SearchForm({
  onSubmit,
  origin,
  setOrigin,
  destination,
  setDestination,
  departure,
  setDeparture,
  fetchInProgress,
  onWhisperFail,
}: SearchFormProps): JSX.Element {
  const buttonText = fetchInProgress ? "Fetching..." : "Search";
  const buttonVariant: ButtonVariant = fetchInProgress
    ? "outline-success"
    : "success";

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="origin">
        <Form.Label column sm="2">
          Origin
        </Form.Label>
        <Col sm="10">
          <FormControlWhisperer
            onFail={onWhisperFail}
            value={origin}
            onChange={(value) => setOrigin(value)}
            placeholder="origin"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="destination">
        <Form.Label column sm="2">
          Destination
        </Form.Label>
        <Col sm="10">
          <FormControlWhisperer
            onFail={onWhisperFail}
            value={destination}
            onChange={(value) => setDestination(value)}
            placeholder="destination"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="departure">
        <Form.Label column sm="2">
          Departure
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="datetime-local"
            placeholder="Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button
        variant={buttonVariant}
        type="button"
        onClick={() => onSubmit(origin, destination, departure)}
      >
        {buttonText}
      </Button>
    </Form>
  );
}
