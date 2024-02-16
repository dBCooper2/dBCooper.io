import Link from "next/link";
// import Illustration from '../components/Illustration';
import Image from "next/image";
import styles from "../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h1>who was</h1>
          <h1>dBCooper2</h1>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Trevor Rowland</h1>
            <h6 className={styles.bio}>
              Business Analytics, Data Science, Financial Analysis
            </h6>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <div className={styles.content}>
                  <h4>Skill Set</h4>
                  <div className={styles.tags}>
                    <span key="Add" className="Add">
                      Add
                    </span>
                    <span key="Project" className="Github">
                      Github
                    </span>
                    <span key="Tags" className="Tags">
                      Tags
                    </span>
                    <span key="To" className="To">
                      To
                    </span>
                    <span key="This" className="This">
                      This
                    </span>
                    <span key="In-Index.jsx" className="In-Index.jsx">
                      In-Index.jsx
                    </span>
                    <span key="Data-Cleaning" className="Data-Cleaning">
                      Data-Cleaning
                    </span>
                    <span key="Software-Design" className="Software-Design">
                      Software-Design
                    </span>
                    <span key="APIs" className="APIs">
                      APIs
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
              <button className={styles.outlined}>Contact</button>
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
