import React from "react";
import { Row, Col } from 'react-bootstrap';
import CodeHighlighter from "./code-highlighter.jsx";
import '../../styles/gif-plus-snippet.css'

const ClipPlusSnippet = ({ gif, snippet, language, order, boids }) => {
    return (
        <Row className="d-flex justify-content-center">
            <Col className="m-auto" sm={11} lg={'auto'}>
                <img src={gif} className={`${order == 'first' ? '' : 'float-end'} ${boids ? 'boids' : 'gif'}`} ></img>
            </Col>
            <Col xs={{ order: order }} className="m-auto">
                <CodeHighlighter code={snippet} language={language} />
            </Col>
        </Row>
    );
};

export default ClipPlusSnippet;