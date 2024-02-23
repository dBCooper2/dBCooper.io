import ThemeInfo from "../components/ThemeInfo";
import styles from "../styles/SettingsPage.module.css";

const SettingsPage = () => {
  return (
    <>
      <h2>Manage Themes</h2>
      <div className={styles.container}>
        <ThemeInfo
          name="Solar-Ish Light"
          icon="/themes/solarish_light.png"
          publisher="dBCooper2"
          theme="solarish-light"
          description="A VS Code theme by me for this website."
        />
        <ThemeInfo
          name="Solar-Ish Dark"
          icon="/themes/solarish_dark.png"
          publisher="dBCooper2"
          theme="solar-ish-dark"
          description="A Dark Theme of Solar-ish Light made by me for this website"
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: "Settings" },
  };
}

export default SettingsPage;
