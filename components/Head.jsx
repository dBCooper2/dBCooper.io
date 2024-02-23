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
      <meta property="og:image" content="/github_imgs/homepage-2-23-24.png" />
      <meta property="og:url" content="https://dBCooper.io" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: "Trevor Rowland",
};
