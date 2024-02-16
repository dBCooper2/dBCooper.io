import Link from "next/link";
// import Illustration from '../components/Illustration';
import Image from "next/image";
import styles from "../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h1>Business</h1>
          <h1>Intelligence?</h1>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Trevor Rowland</h1>
            <h6 className={styles.bio}>
              Business Intelligence, Data Analytics
            </h6>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <div className={styles.content}>
                  <h4>Skill Set</h4>
                  <div className={styles.tags}>
                    <span key="Python" className="Python">
                      Python
                    </span>
                    <span key="Jupyter-Notebooks" className="Jupyter-Notebooks">
                      Jupyter-Notebooks
                    </span>
                    <span
                      key="Data-Visualization"
                      className="Data-Visualization"
                    >
                      Data-Visualization
                    </span>
                    <span key="APIs" className="APIs">
                      APIs
                    </span>
                    <span key="SQL" className="SQL">
                      SQL
                    </span>
                    <span key="Pandas" className="Pandas">
                      Pandas
                    </span>
                    <span key="Linear-Regression" className="Linear-Regression">
                      Linear-Regression
                    </span>
                    <span key="Software-Design" className="Software-Design">
                      Software-Design
                    </span>
                    <span key="Excel" className="Excel">
                      Excel
                    </span>
                    <span key="CAPM" className="CAPM">
                      CAPM
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/about">
              <button className={styles.button}>About Me</button>
            </Link>
            {/* <Link href="/projects">
              <button className={styles.button}>View Projects</button>
            </Link> */}
            <Link href="/contact">
              <button className={styles.button}>Contact</button>
            </Link>
          </div>
          {/* <Illustration className={styles.illustration} /> */}
          <div className={styles.right}>
            <div className={styles.picture_boader}>
              <Image
                className={styles.picture}
                src="/my-ai-headshot-flipped.png"
                width={325}
                height={325}
                alt="Trevor's Picture"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { title: "Home" },
  };
}
