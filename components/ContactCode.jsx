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
    link: "trevor-rowland.vercel.app",
    href: "https://trevor-rowland.vercel.app/",
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
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
