import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { LoginContext } from "../context/LoginContext";
import ButtonWithPopoverConfirmation from "./ButtonWithPopoverConfirmation";

const ProjectForm = ({
  onHide,
  performAction,
  actionButtonText,
  initialValues,
  title,
}) => {
  const { loginData } = useContext(LoginContext);
  const [formValues, setFormValues] = useState({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    startDate: initialValues?.startDate || "",
    endDate: initialValues?.endDate || "",
    state: initialValues?.state || "Pending",
  });
  const [showValidationMessages, setShowValidationMessage] = useState(false);
  const [isFormValid, setIsFormValid] = useState(!!initialValues);

  const validateForm = ({ name, description, startDate, endDate, state }) => {
    setIsFormValid(
      name.trim() !== "" &&
        description.trim() !== "" &&
        startDate.trim() !== "" &&
        endDate.trim() !== "" &&
        state.trim() !== "" &&
        Date.parse(startDate) <= Date.parse(endDate)
    );
  };

  const handleChange = (e) => {
    const newFormValues = { ...formValues };
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues);
    validateForm(newFormValues);
  };

  const onClickConfirmCreateProject = () => {
    setShowValidationMessage(true);
    validateForm(formValues);
  };

  const onClickYesPerformAction = () => {
    const newProject = {
      ...formValues,
      id: Date.now(),
      userId: loginData.userId,
    };
    performAction(newProject);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              isInvalid={formValues.name === "" && showValidationMessages}
              onChange={handleChange}
              value={formValues.name}
              name="name"
              placeholder="Enter projects name"
            />
            <Form.Control.Feedback type="invalid">
              Please choose a name for your project.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              isInvalid={formValues.startDate === "" && showValidationMessages}
              onChange={handleChange}
              value={formValues.startDate}
              name="startDate"
              type="date"
              placeholder="Enter startDate"
              max={formValues.endDate}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a start date for your project.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              isInvalid={formValues.endDate === "" && showValidationMessages}
              onChange={handleChange}
              value={formValues.endDate}
              name="endDate"
              type="date"
              placeholder="Enter endDate"
              min={formValues.startDate}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a end date for your project.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Select
              onChange={handleChange}
              value={formValues.state}
              name="state"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Complete">Complete</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              isInvalid={
                formValues.description === "" && showValidationMessages
              }
              onChange={handleChange}
              value={formValues.description}
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a description for your project.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonWithPopoverConfirmation
          onClick={onClickConfirmCreateProject}
          PerformAction={onClickYesPerformAction}
          mainText={actionButtonText}
          mainVariant="success"
          noVariant="danger"
          yesVariant="success"
          isPopoverDisabled={!isFormValid}
        />
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </>
  );
};

export default ProjectForm;
