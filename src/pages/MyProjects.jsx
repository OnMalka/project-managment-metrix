import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../actions/loginActions";
import {
  addProjectAction,
  deleteProjectAction,
  setProjectsAction,
  sortProjectsByAction,
  updateProjectAction,
} from "../actions/projectActions";
import ErrorModal from "../components/ErrorModal";
import ModalContainer from "../components/ModalContainer";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import TableBody from "../components/TableBody";
import TableHeader from "../components/TableHeader";
import { LoginContext } from "../context/LoginContext";
import { getProjectsFromDb } from "../pseudoDB/pseudoDB";
import ProjectsReducer from "../reducers/ProjectsReducer";
import { deleteLoginDataFromSessionStorage } from "../sessionStorage/sessionStorage";

const MyProjects = () => {
  const { loginData, dispatchLoginData } = useContext(LoginContext);
  const [projects, dispatchProjects] = useReducer(ProjectsReducer, []);
  const [sortBy, setSortBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const navigate = useNavigate();

  const handleErrors = useCallback(
    (error) => {
      if (error.includes("401")) {
        dispatchLoginData(logoutAction());
        deleteLoginDataFromSessionStorage();
        navigate("/login");
      } else {
        setModalContent(
          <ErrorModal
            onHide={() => setShowModal(false)}
            status="Status: 500"
            message="Message: Internal server error"
          />
        );
        setShowModal(true);
      }
    },
    [dispatchLoginData, navigate]
  );

  useEffect(() => {
    try {
      const projectsArray = getProjectsFromDb(loginData.token);
      dispatchProjects(setProjectsAction(projectsArray));
    } catch (err) {
      handleErrors(err.message);
    }
  }, [loginData.token, handleErrors]);

  const onClickEditProject = (project) => {
    setModalContent(
      <ProjectForm
        title="Edit Project"
        actionButtonText="Edit"
        performAction={(newProjectData) => {
          dispatchProjects(updateProjectAction(project.id, newProjectData));
          dispatchProjects(sortProjectsByAction(sortBy));
          setShowModal(false);
        }}
        initialValues={{
          name: project.name,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          state: project.state,
        }}
        onHide={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const onClickShowDetails = (project) => {
    const deleteProjectById = (projectId) => {
      dispatchProjects(deleteProjectAction(projectId));
      setShowModal(false);
    };

    setModalContent(
      <ProjectDetails
        onClickEditProject={onClickEditProject}
        deleteProjectById={deleteProjectById}
        onHide={() => setShowModal(false)}
        project={project}
      />
    );
    setShowModal(true);
  };

  const getFilteredProjects = () => {
    return searchValue.trim() === ""
      ? projects
      : projects.filter((project) =>
          project.name.toLowerCase().includes(searchValue.toLowerCase())
        );
  };

  const onClickShowAddProject = () => {
    const addNewProject = (project) => {
      dispatchProjects(addProjectAction(project));
      dispatchProjects(sortProjectsByAction(sortBy));
      setShowModal(false);
    };

    setModalContent(
      <ProjectForm
        title="Add Project"
        actionButtonText="Add"
        performAction={addNewProject}
        onHide={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  return (
    <div>
      <Form
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px auto",
        }}
      >
        <Form.Group>
          <Form.Label htmlFor="search">Search Projects</Form.Label>
          <Form.Control
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="sortBy">Sort By</Form.Label>
          <Form.Select
            onChange={(e) => {
              const sortByValue = e.target.value;
              setSortBy(sortByValue);
              dispatchProjects(sortProjectsByAction(sortByValue));
            }}
            value={sortBy}
            name="sortBy"
          >
            <option value="name">Name</option>
            <option value="start-date">Start Date</option>
            <option value="end-date">End Date</option>
            <option value="state">State</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <TableHeader columns={["#", "Name", "End Date", "State"]} />
        <TableBody
          onClickShowDetails={onClickShowDetails}
          projects={getFilteredProjects()}
        />
      </Table>
      <Button
        style={{
          position: "fixed",
          bottom: "100px",
          marginLeft: "calc(35% - 54px)",
        }}
        onClick={onClickShowAddProject}
      >
        Add Project
      </Button>
      <ModalContainer
        show={showModal}
        onHide={() => setShowModal(false)}
        content={modalContent}
      />
    </div>
  );
};

export default MyProjects;
