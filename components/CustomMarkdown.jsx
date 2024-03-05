import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // CHANGE AFTER WRITING CUSTOM CSS

const CustomMarkdown = ({ content, ...props }) => {
  const markdownRef = useRef();

  useEffect(() => {
    // Highlight code blocks after the component mounts
    if (markdownRef.current) {
      markdownRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }, [content]);

  return (
    <div ref={markdownRef}>
      <ReactMarkdown {...props} children={content} />
    </div>
  );
};

export default CustomMarkdown;
