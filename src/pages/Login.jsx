import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../actions/loginActions";
import ErrorModal from "../components/ErrorModal";
import ModalContainer from "../components/ModalContainer";
import { LoginContext } from "../context/LoginContext";
import { login } from "../pseudoDB/pseudoDB";
import { setLoginDataOnSessionStorage } from "../sessionStorage/sessionStorage";
import validator from "validator";

const Login = () => {
  const { dispatchLoginData } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState(
    "Please enter your email."
  );
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [showValidationMessages, setShoeValidationMessages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue.trim() === "") {
      setEmailValidationMessage("Please enter your email.");
      setIsEmailInvalid(true);
    } else if (!validator.isEmail(emailValue)) {
      setEmailValidationMessage("Please enter a valid email.");
      setIsEmailInvalid(true);
    } else setIsEmailInvalid(false);
  };

  const onSubmitLogIn = async (e) => {
    e.preventDefault();
    if (isEmailInvalid) setShoeValidationMessages(true);
    else
      try {
        const loginData = login(email, password);
        setLoginDataOnSessionStorage(loginData);
        await dispatchLoginData(loginAction(loginData));
        navigate("/my-projects");
      } catch (err) {
        const [status, message] = err.message.includes("400")
          ? err.message.split(", ")
          : ["Status: 500", "Internal server error"];
        setModalContent(
          <ErrorModal
            onHide={() => setShowModal(false)}
            status={status}
            message={message}
          />
        );
        setShowModal(true);
      }
  };

  return (
    <div>
      <Form onSubmit={onSubmitLogIn}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={onEmailChange}
            isInvalid={isEmailInvalid && showValidationMessages}
            value={email}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Form.Control.Feedback type="invalid">
            {emailValidationMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isInvalid={password.trim() === "" && showValidationMessages}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ModalContainer
        show={showModal}
        onHide={() => setShowModal(false)}
        content={modalContent}
      />
    </div>
  );
};

export default Login;
