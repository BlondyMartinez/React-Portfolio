import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoEmbed = ({ src }) => {
    return (
        <Container className="d-flex justify-content-center my-4">
            <Row className="w-100">
                <Col className='video-container'>
                    <div className="project-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src={src}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default VideoEmbed;
