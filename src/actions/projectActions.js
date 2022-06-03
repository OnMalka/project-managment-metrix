export const setProjectsAction = (projects) => ({
  type: "SET_PROJECTS",
  projects,
});

export const addProjectAction = (project) => ({
  type: "ADD_PROJECT",
  project,
});

export const deleteProjectAction = (projectId) => ({
  type: "DELETE_PROJECT",
  projectId,
});

export const updateProjectAction = (projectId, newProjectData) => ({
  type: "UPDATE_PROJECT",
  projectId,
  newProjectData,
});

export const sortProjectsByAction = (sortBy) => ({
  type: "SORT_BY",
  sortBy,
});
