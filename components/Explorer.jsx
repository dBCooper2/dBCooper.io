import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ChevronRight from "../components/icons/ChevronRight";
import styles from "../styles/Explorer.module.css";

const explorerItems = [
  {
    name: "home.md",
    path: "/",
    icon: "markdown_icon.svg",
  },
  {
    name: "about.md",
    path: "/about",
    icon: "markdown_icon.svg",
  },
  {
    name: "contact.md",
    path: "/contact",
    icon: "markdown_icon.svg",
  },
  {
    name: "projects.py",
    path: "/projects",
    icon: "py_icon.svg",
  },
  {
    name: "github.py",
    path: "/github",
    icon: "py_icon.svg",
  },
];

const articlesItems = [];

const Explorer = () => {
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [articlesOpen, setArticlesOpen] = useState(false);

  return (
    <div className={styles.explorer}>
      <p className={styles.title}>Explorer</p>
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="portfolio-checkbox"
          checked={portfolioOpen}
          onChange={() => setPortfolioOpen(!portfolioOpen)}
        />
        <label htmlFor="portfolio-checkbox" className={styles.heading}>
          <ChevronRight
            className={styles.chevron}
            style={portfolioOpen ? { transform: "rotate(90deg)" } : {}}
          />
          Portfolio
        </label>
        <div
          className={styles.files}
          style={portfolioOpen ? { display: "block" } : { display: "none" }}
        >
          {explorerItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className={styles.file}>
                <Image
                  src={`/${item.icon}`}
                  alt={item.name}
                  height={18}
                  width={18}
                />{" "}
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <input
            type="checkbox"
            className={styles.checkbox}
            id="articles-checkbox"
            checked={articlesOpen}
            onChange={() => setArticlesOpen(!articlesOpen)}
          />
          <label htmlFor="articles-checkbox" className={styles.heading}>
            <ChevronRight
              className={styles.chevron}
              style={articlesOpen ? { transform: "rotate(90deg)" } : {}}
            />
            Articles
          </label>
          <div
            className={styles.files}
            style={articlesOpen ? { display: "block" } : { display: "none" }}
          >
            {articlesItems.map((item) => (
              <Link href={item.path} key={item.name}>
                <div className={styles.file}>
                  <Image
                    src={`/${item.icon}`}
                    alt={item.name}
                    height={18}
                    width={18}
                  />{" "}
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
