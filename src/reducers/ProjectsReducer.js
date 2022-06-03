import _ from "lodash";

const getNumberValueForProjectState = (state) => {
  switch (state) {
    case "Pending": {
      return 1;
    }
    case "In Progress": {
      return 2;
    }
    case "Review": {
      return 3;
    }
    case "Complete": {
      return 4;
    }
    default: {
      return -1;
    }
  }
};

const ProjectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS": {
      return [...action.projects];
    }
    case "ADD_PROJECT": {
      return [..._.cloneDeep(state), action.project];
    }
    case "DELETE_PROJECT": {
      const clonedState = _.cloneDeep(state);
      clonedState.splice(
        clonedState.findIndex((project) => project.id === action.projectId),
        1
      );

      return clonedState;
    }
    case "UPDATE_PROJECT": {
      const clonedState = _.cloneDeep(state);
      const projectIndex = clonedState.findIndex(
        (project) => project.id === action.projectId
      );
      const newProject = {
        ...clonedState[projectIndex],
        ...action.newProjectData,
      };
      clonedState[projectIndex] = newProject;

      return clonedState;
    }
    case "SORT_BY": {
      switch (action.sortBy) {
        case "start-date": {
          return _.cloneDeep(state).sort(
            (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
          );
        }
        case "end-date": {
          return _.cloneDeep(state).sort(
            (a, b) => Date.parse(a.endDate) - Date.parse(b.endDate)
          );
        }
        case "name": {
          return _.cloneDeep(state).sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }
        case "state": {
          return _.cloneDeep(state).sort(
            (a, b) =>
              getNumberValueForProjectState(a.state) -
              getNumberValueForProjectState(b.state)
          );
        }
        default: {
          return state;
        }
      }
    }
    default:
      return state;
  }
};

export default ProjectsReducer;
