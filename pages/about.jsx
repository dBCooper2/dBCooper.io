import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const myResume = './trevor-rowland-resume.pdf';

const AboutPage = () => {
  return (
    <>
      <h3>About Me</h3><br/>
      <ul>
        <li><span role="img" aria-label="book">📖</span> Pursuing a BS in Business Analytics @ <a href='https://www.tntech.edu/business/undergraduate/business-analytics/index.php'>Tennessee Tech University</a>.</li>
        <li><span role="img" aria-label="graduate-hat">🎓</span> Seeking a Position in Business or Data Analytics</li>
        <li><span role="img" aria-label="laptop">💻</span> Currently building custom Regression Models for Financial Analysis in the  <a href='https://github.com/dBCooper2/pythonic-finance'>Pythonic Finance</a> Repository</li>
      </ul>
      <br/>
      <center>
        <h3>Resume (<a href={myResume} download="trevor-rowland-resume.pdf">Download</a>)</h3>
        <br />
        <Document file={myResume}>
          <Page pageIndex={0} renderMode="svg"/>
        </Document>
      </center>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
