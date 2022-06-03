import { Button, Modal } from "react-bootstrap";
import ButtonWithPopoverConfirmation from "./ButtonWithPopoverConfirmation";

const ProjectDetails = (props) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.project.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          {props.project.startDate} {"->"} {props.project.endDate}
        </h5>
        <p>{props.project.description}</p>
        <h4>{props.project.state}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => props.onClickEditProject(props.project)}
        >
          Edit
        </Button>
        <ButtonWithPopoverConfirmation
          PerformAction={() => {
            props.deleteProjectById(props.project.id);
          }}
          mainText="Delete"
          mainVariant="danger"
          noVariant="danger"
          yesVariant="success"
          isPopoverDisabled={false}
        />
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </>
  );
};

export default ProjectDetails;
