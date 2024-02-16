import ProjectCard from "../components/ProjectCard";
import { getMLProjects } from "./api/ml-projects";
import { getBotsProjects } from "./api/bots-projects";
import { getPyPiProjects } from "./api/pypi-projects";
import { getMiscProjects } from "./api/misc-projects";

import { getPythonProjects } from "./api/python-projects";
import { getTechProjects } from "./api/tech-projects";

import styles from "../styles/ProjectsPage.module.css";

const ProjectsPage = ({
  python_projects,
  tech_projects,
  ml_projects,
  bots_projects,
  pypi_projects,
  misc_projects,
}) => {
  return (
    <>
      <h3>Personal Projects</h3>
      <br />
      <center>
        <h4>Python Projects</h4>
      </center>
      <hr />
      <div className={styles.container}>
        {python_projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <br />
      <center>
        <h4>Class Projects</h4>
      </center>
      <hr />
      <div className={styles.container}>
        {tech_projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const python_projects = getPythonProjects();
  const tech_projects = getTechProjects();

  return {
    props: {
      title: "Projects",
      python_projects,
      tech_projects,
    },
  };
}

export default ProjectsPage;
