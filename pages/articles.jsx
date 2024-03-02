import { useRouter } from 'next/router';
import { getArticlesMetadata } from './api/articles';
import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import tagsData from './api/tags.json';
import styles from "../styles/ArticlesPage.module.css";

const ArticlesPage = ({ articles }) => {
  const router = useRouter();
  const { tag } = router.query;
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const tags = tagsData.map((tagData) => tagData.text);

  // Filter articles based on tag parameter
  useEffect(() => {
    if (tag) {
      const filtered = articles.filter((article) => article.tags.includes(tag));
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [tag, articles]);

  const handleFilter = (selectedTag) => {
    router.push(`/articles${selectedTag ? `?tag=${encodeURIComponent(selectedTag)}` : ''}`);
  };

  const clearFilters = () => {
    router.push('/articles');
  };

  return (
    <div>
      <div className={styles.title_container}>
        <center>
          <h1>Articles</h1>
        </center>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Filter by Tag</button>
            <div className={styles.dropdownContent}>
            <button onClick={clearFilters}>Clear Filters</button>
              {tags.map((tag) => (
                <button key={tag} onClick={() => handleFilter(tag)}>{tag}</button>
              ))}
            </div>
          </div>
      </div>
      <br />
      <hr />
      <div className={styles.container}>
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  // Fetch articles metadata
  const articles = getArticlesMetadata();

  return {
    props: {
      articles,
    },
  };
};

export default ArticlesPage;

