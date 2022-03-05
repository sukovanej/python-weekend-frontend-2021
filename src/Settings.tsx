import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

export const BACKEND_URL_STORAGE_KEY = "backendUrl";

function saveSettings(backendUrl: string): void {
  window.localStorage.setItem(BACKEND_URL_STORAGE_KEY, backendUrl);
}

export default function Settings(): JSX.Element {
  const [backendUrl, setBackendUrl] = useState<string>(
    window.localStorage.getItem(BACKEND_URL_STORAGE_KEY) || ""
  );
  const [show, setShow] = useState(false);

  const save = () => {
    saveSettings(backendUrl);
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        style={{ marginRight: "15px" }}
      >
        Settings
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="origin">
              <Form.Label>Backend URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Origin"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
