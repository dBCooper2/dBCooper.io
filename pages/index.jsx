import Link from "next/link";
// import Illustration from '../components/Illustration';
const myResume = "./documents/trevor-rowland-resume.pdf";
import Image from "next/image";
import styles from "../styles/HomePage.module.css";
import { useRouter } from "next/router";

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
                    <Link href="/[tag]" as={`/${encodeURIComponent("Python")}`}>
                      <span key="Python" className="Python" >
                        Python
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Pandas")}`}>
                      <span key="Pandas" className="Pandas">
                        Pandas
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("SQL")}`}>
                      <span key="SQL" className="SQL">
                        SQL
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Jupyter-Notebooks")}`}>
                      <span key="Jupyter-Notebooks" className="Jupyter-Notebooks">
                        Jupyter-Notebooks
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Excel")}`}>
                      <span key="Excel" className="Excel">
                        Excel
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Data-Analysis")}`}>
                      <span key="Data-Analysis" className="Data-Analysis">
                        Data-Analysis
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Data-Visualization")}`}>
                      <span
                        key="Data-Visualization"
                        className="Data-Visualization"
                      >
                        Data-Visualization
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("APIs")}`}>
                      <span key="APIs" className="APIs">
                        APIs
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Linear-Regression")}`}>
                      <span key="Linear-Regression" className="Linear-Regression">
                        Linear-Regression
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Software-Design")}`}>
                      <span key="Software-Design" className="Software-Design">
                        Software-Design
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("CAPM")}`}>
                      <span key="CAPM" className="CAPM">
                        CAPM
                      </span>
                    </Link>
                    <Link href="/[tag]" as={`/${encodeURIComponent("Fama-French")}`}>
                      <span key="Fama-French" className="Fama-French">
                        Fama-French
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link href="/about">
                <button className={styles.button}>About Me</button>
              </Link>
              <Link href="/contact">
                <button className={styles.button}>Contact</button>
              </Link>
              <Link href={myResume} download="trevor-rowland-resume.pdf">
                <button className={styles.button}>Resume</button>
              </Link>
              <Link href="/projects">
                <button className={styles.button}>View Projects</button>
              </Link>
            </div>
          </div>
          {/* <Illustration className={styles.illustration} /> */}
          <div className={styles.right}>
            <div className={styles.picture_boader}>
              <Image
                className={styles.picture}
                src="/headshots/my-ai-headshot-flipped.png"
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
