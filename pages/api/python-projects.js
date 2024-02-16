import data from "./python-projects.json";

export const getPythonProjects = () => {
  return data;
};

export default (req, res) => {
  const python_projects = getPythonProjects();
  res.json(python_projects);
};
