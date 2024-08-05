import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/timeline.css';

const Timeline = ({ title, items }) => {
    return (
        <Container className="timeline-container col-sm-10 col-md-10 col-lg-4 mt-2">
            <div className='p-3 card text-white'>
                <h2 className="timeline-title light-blue-text">{title}</h2>
                <ul className="timeline">
                    {items.map((item, index) => (
                        <li key={index + title} className="timeline-item">
                            <Row>
                                <Col sm={2}>
                                    <div className="timeline-date">
                                    <strong>{item.startDate}</strong> {item.endDate ? ' - ' + item.endDate : ''}
                                    </div>
                                </Col>
                                <Col sm={10}>
                                    <div className="timeline-content">
                                        <h3>{item.title}</h3>
                                        <h5 className='light-blue-text'>{item.company}</h5>
                                        <ul className='ms-3'>
                                            {item.bulletPoints?.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default Timeline;