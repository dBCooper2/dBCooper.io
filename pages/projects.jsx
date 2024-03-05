import ProjectCard from "../components/ProjectCard";
import FilterButton from "../components/FilterButton";
import { getPythonProjects } from "./api/python-projects";
import { getTechProjects } from "./api/tech-projects";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../styles/ProjectsPage.module.css";

const ProjectsPage = ({ python_projects, tech_projects }) => {
  
  const router = useRouter();
  const { tag } = router.query;
  const [filteredPythonProjs, setFilteredPythonProjs] = useState(python_projects);
  const [filteredTechProjs, setFilteredTechProjs] = useState(tech_projects);
  

  // Filter articles based on tag parameter
  useEffect(() => {
    if (tag) {
      const py_filtered = python_projects.filter((python_proj) => python_proj.tags.includes(tag));
      const tech_filtered = tech_projects.filter((tech_proj) => tech_proj.tags.includes(tag));
      setFilteredPythonProjs(py_filtered);
      setFilteredTechProjs(tech_filtered);
    } else {
      setFilteredPythonProjs(python_projects);
      setFilteredTechProjs(tech_projects);
    }
  }, [tag, python_projects, tech_projects]);

  return (
    <div>
      <div className={styles.title_container}>
        <h1>Projects</h1>
        <center>
          <FilterButton destination="projects"/>
        </center>
      </div>
      <br />
      <center>
        <h2>Python Projects</h2>
      </center>
      <hr />
      <div className={styles.container}>
        {filteredPythonProjs.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <br />
      <center>
        <h2>Class Projects</h2>
      </center>
      <hr />
      <div className={styles.container}>
        {filteredTechProjs.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
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
