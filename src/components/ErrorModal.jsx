import { Button, Modal } from "react-bootstrap";

const ErrorModal = (props) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>{props.status}</h2>
        <h2>{props.message}</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </>
  );
};

export default ErrorModal;
