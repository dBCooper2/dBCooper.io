import MathJax from 'mathjax';

MathJax.config = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};

export default MathJax.config;