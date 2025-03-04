import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProjectCard.module.css";

const ProjectCard = ({ project }) => {
  return (
    <div>
      <Link href={project.source_code}>
        <div className={styles.card}>
          <Image
            src={project.image}
            height={300}
            width={600}
            alt={project.name}
            style={{ borderRadius: "10px" }}
          />
          <div className={styles.content}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.cta}>
              {project.source_code && (
                <a
                  href={project.source_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.underline}
                >
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.underline}
                >
                  Link/Demo
                </a>
              )}
              {project.scholar && (
                <a
                  href={project.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.underline}
                >
                  Paper
                </a>
              )}
              {project.pypi && (
                <a
                  href={project.pypi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.underline}
                >
                  PyPi
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
