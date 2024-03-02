import { getArticlesMetadata } from '../api/articles.js';

import styles from "../../styles/Article.module.css"

const ArticlePage = ({ article }) => {
    return (
        <>
            <div>
                Hello!
                This is a page to show different Jupyter Notebooks I have written, and is still under construction. 
                I am still working on getting the articles to render, so check back soon!
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
  const article = articles.find((article) => article.slug === params.slug);

  // Pass article data to the page component
  return {
    props: {
        title: "Article",
        article,
    },
  };
}

export default ArticlePage;
