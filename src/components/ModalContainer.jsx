import { Modal } from "react-bootstrap";

const ModalContainer = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      {props.content}
    </Modal>
  );
};

export default ModalContainer;
