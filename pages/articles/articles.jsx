import React from "react";
import notebookHTML from "/pages/api/articles/simple_linear_regression.html";

const Articles_Page = () => {
  return (
    <div>
      <header>
        <h1>UNDER CONSTRUCTION: Articles</h1>
      </header>
      <main>
        <p>
          This is a test for embedding HTML converted from Jupyter
          Notebooks/Markdown and matching the styles. See the Github Issues Page
          in the db-cooper-io Repository for planned updates to this
        </p>
        <object
          data={notebookHTML}
          type="text/html"
          style={{ width: "100%", height: "90vh" }}
        ></object>
        <style>{}</style>
      </main>
      <footer>
        <p>
          <a href="https://github.com/dBCooper2/pythonic-finance/blob/main/notebooks/regression_models/simple_linear_regression.ipynb">
            Link to Original Notebook File
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Articles_Page;
