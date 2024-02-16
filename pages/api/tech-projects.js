import data from "./tech-projects.json";

export const getTechProjects = () => {
  return data;
};

export default (req, res) => {
  const projects = getTechProjects();
  res.json(projects);
};
