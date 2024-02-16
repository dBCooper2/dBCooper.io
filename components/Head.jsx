import Head from "next/head";

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Trevor Rowland's Profolio." />
      <meta
        name="keywords"
        content="trevor rowland, trevor, rowland, data analyst portfolio, business analytics, business IT, data analytics, trevor rowland portfolio, vscode-portfolio"
      />
      <meta property="og:title" content="Trevor Rowland's Portfolio" />
      <meta property="og:description" content="Trevor Rowland's Portfolio." />
      <meta
        property="og:image"
        content="https://github.com/dBCooper2/dBCooper.io/blob/main/public/db_2023db.jpg"
      />
      <meta property="og:url" content="https://dBCooper.io" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: "Trevor Rowland",
};
