import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-bright.css'; 

const CodeHighlighter = ({ code, language }) => {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <pre className='small-code w-100 m-0'>
            <code ref={codeRef} className={`language-${language} radius-20`}>
                {code}
            </code>
        </pre>
    );
};

export default CodeHighlighter;
