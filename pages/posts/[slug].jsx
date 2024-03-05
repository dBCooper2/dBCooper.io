import { getArticlesMetadata } from '../api/articles.js';
import styles from "../../styles/Article.module.css"
import fs from 'fs'; // Node.js File System module
import path from 'path'; // Node.js Path module
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import "katex/dist/katex.min.css";

// pages/index.js
import dynamic from "next/dynamic";

const ArticlePage = ({ article }) => {

  const Notebook = dynamic(() => import("../../components/Notebook"), {
    ssr: false
  });

  return (
    <> 
      <div>
      <br />
        This page is still under construction, if you see any issues with the LaTeX or code blocks, please check with the source code at the bottom of the page to see the corrected version. Thanks!
      <hr />
      <br />
      </div>
      <div className={styles.container}>
        <Notebook className={styles.notebook}
			  filePath="https://raw.githubusercontent.com/dBCooper2/pythonic-finance/main/notebooks/regression_models/multiple_linear_regression.ipynb" // Or a raw JSON notebook file location online
			  notebookInputLanguage="python"
			  // Rest of the properties if required.
		    />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const articles = getArticlesMetadata();

  // Get the paths we want to pre-render based on articles
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch article data based on the slug
  const articles = getArticlesMetadata();
  const articleMetaData = articles.find((article) => article.slug === params.slug);

  // Fetch the MDFile's Data
  const filePath = path.join(process.cwd(), articleMetaData.pathToFile);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Pass article data to the page component
  return {
    props: {
        title: "Article",
        article: {
          ...articleMetaData,
          content: fileContent // Pass Markdown content
      },
    },
  };
}

export default ArticlePage;
