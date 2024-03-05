import { getArticlesMetadata } from "./api/articles.js"
import { getPythonProjects } from "./api/python-projects.js";
import { getTechProjects } from "./api/tech-projects.js"
import ArticleCard from "../components/ArticleCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import FilterButton from "../components/FilterButton.jsx";
import styles from "../styles/RelevantWork.module.css"
import path from "path";
import fs from "fs";
import { useState } from "react";
import { decode } from "punycode";


const ContentPage = ({ articles, python_projects, tech_projects, selectedTag }) => {

  return (
    <div>
      <div className={styles.title_container}>
        <h1>Relevant Articles and Projects</h1>
        <center>
          <FilterButton destination= "tag" tag={selectedTag}/>
        </center>
      </div>
      <hr />
      <br />
      <h3>Projects</h3>
      <hr />
      <div className={styles.container}>
        {python_projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {tech_projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div>
      <h3>Articles</h3>
      <hr />
      <div className={styles.container}>
        {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <br />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch all possible tag values from your data source
  // For example, you might fetch them from a database
  const tagsFilePath = path.join(process.cwd(), 'pages', 'api', 'tags.json');
  const tagsData = fs.readFileSync(tagsFilePath, 'utf-8');
  const tags = JSON.parse(tagsData);

  // Generate paths for all possible tags
  const paths = tags.map((tag) => ({
    params: { tag: encodeURIComponent(tag.text) },
  }));

  return {
    paths,
    fallback: false, // Set to true if there are dynamic paths that Next.js should handle
  };
}


export const getStaticProps = async ({ params }) => {
  const tag = params ? params.tag : null;
  const decodedTag = decodeURIComponent(tag);

  //console.log('Tag:', tag);
  //console.log('Decoded Tag:', decodedTag);

  const articles = getArticlesMetadata();
  const python_projects = getPythonProjects();
  const tech_projects = getTechProjects();

  //console.log('All Articles:', articles);
  //console.log('All Python Projects:', python_projects);
  //console.log('All Tech Projects:', tech_projects);

  // Filter projects based on the tag
  const filteredPythonProjects = decodedTag
    ? python_projects.filter((project) => project.tags.includes(decodedTag))
    : python_projects;
  const filteredTechProjects = decodedTag
    ? tech_projects.filter((project) => project.tags.includes(decodedTag))
    : tech_projects;
  const filteredArticles = decodedTag
    ? articles.filter((article) => article.tags.includes(decodedTag))
    : articles;

  //console.log('Filtered Python Projects:', filteredPythonProjects);
  //console.log('Filtered Tech Projects:', filteredTechProjects);
  //console.log('Filtered Articles:', filteredArticles);

  return {
    props: {
      articles: filteredArticles,
      python_projects: filteredPythonProjects,
      tech_projects: filteredTechProjects,
      selectedTag: decodedTag,
    },
  };
};


export default ContentPage;