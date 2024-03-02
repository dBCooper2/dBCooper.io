import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ArticleCard.module.css";

const ArticleCard = ({ article }) => {
  return (
    <div>
      <Link href={`posts/${article.slug}`}>
        <div className={styles.card}>
          <Image
            src={article.image}
            height={300}
            width={600}
            alt={article.title}
            style={{ borderRadius: "10px" }}
          />
          <div className = {styles.content}>
            <center>
                <h3>{article.title}</h3>
            </center>
            <h4>{article.subtitle}</h4>
            <h6>{article.date}</h6>
            <p>{article.description}</p>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
