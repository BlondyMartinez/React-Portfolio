import React from "react";
import { Col } from "react-bootstrap";
import GifPlusSnippet from './gif-plus-snippet.jsx'

const Feature = ({ feature, description, gif, snippet, language, order, sm, lg }) => {
    return (
        <Col  sm={sm || 11} lg={lg || 6}> 
            <h5 className="light-blue-text">{feature}</h5>
            <p>{description}</p>
            <GifPlusSnippet gif={gif} snippet={snippet} language={language} order={order} />
        </Col>
    );
};

export default Feature;