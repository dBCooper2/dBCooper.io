import styles from "../styles/ContactCode.module.css";

const contactItems = [
  {
    social: "Email",
    link: "t.rowland711@gmail.com",
    href: "mailto:t.rowland711@gmail.com",
  },
  {
    social: "LinkedIn",
    link: "linkedin.com/in/trevor-rowland711",
    href: "https://www.linkedin.com/in/trevor-rowland711",
  },
  {
    social: "GitHub",
    link: "github.com/dBCooper2",
    href: "https://github.com/dBCooper2",
  },
  {
    social: "Website",
    link: "db-cooper-io.vercel.app",
    href: "https://db-cooper-io.vercel.app/",
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        tag: <a>production</a>
      </p>
      <p className={styles.line}>
        <span>trevor</span>&#58;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;&#8212; <span>socials</span>&#58;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.social}:{" "}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.social}:{" "}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
        </p>
      ))}
    </div>
  );
};

export default ContactCode;
