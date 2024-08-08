import React from "react";
import { Row, Col } from 'react-bootstrap';
import CodeHighlighter from "./code-highlighter.jsx";
import '../../styles/gif-plus-snippet.css'

const ClipPlusSnippet = ({ gif, snippet, language, order }) => {
    return (
        <Row className="d-flex justify-content-center">
            <Col className="m-auto" sm={11} lg={'auto'}>
                <img src={gif} className={`gif ${order == 'first' ? '' : 'float-end'}`} ></img>
            </Col>
            <Col xs={{ order: order }} className="m-auto">
                <CodeHighlighter code={snippet} language={language} />
            </Col>
        </Row>
    );
};

export default ClipPlusSnippet;