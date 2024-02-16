import Tab from "./Tab";
import styles from "../styles/Tabsbar.module.css";

const Tabsbar = () => {
  return (
    <div className={styles.tabs}>
      <Tab icon="/markdown_icon.svg" filename="home.md" path="/" />
      <Tab icon="/markdown_icon.svg" filename="about.md" path="/about" />
      <Tab icon="/markdown_icon.svg" filename="contact.md" path="/contact" />
      <Tab icon="/py_icon.svg" filename="projects.py" path="/projects" />
      {/* <Tab icon="/json_icon.svg" filename="articles.json" path="/articles" /> */}
      <Tab icon="/py_icon.svg" filename="github.py" path="/github" />
    </div>
  );
};

export default Tabsbar;
