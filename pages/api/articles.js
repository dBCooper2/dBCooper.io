import data from "./articles.json";

export const getArticlesMetadata = () => {
  return data;
};

export default (req, res) => {
  const articleMetadata = getArticlesMetadata();
  res.json(articleMetadata);
};