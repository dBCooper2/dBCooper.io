import { getArticlesMetadata } from '../api/articles.js';
import styles from "../../styles/MdArticles.module.css"
import fs from 'fs'; // Node.js File System module
import path from 'path'; // Node.js Path module
import CustomMarkdown from '../../components/CustomMarkdown.jsx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import "katex/dist/katex.min.css";
import rehypeRaw from 'rehype-raw';


const ArticlePage = ({ article }) => {

  return (
    <> 
      <div>
      <br />
        This page is still under construction, if you see any issues with the LaTeX or code blocks, please check with the source code at the bottom of the page to see the corrected version. Thanks!
      <hr />
      <br />
      </div>
      <div>
      <CustomMarkdown
        className={styles.body}
        content={article.content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
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
