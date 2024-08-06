import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/project-card.css';
import FancyButton from './button.jsx';
import useScreenWidth from '../hooks/useScreenWidth.jsx';

const ProjectCard = ({ title, techStack, significance, videoUrl, projectUrl, gitUrl, live }) => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const smallDevice = useScreenWidth();

    const handleMouseEnter = () => {
        if (videoRef.current) {
            console.log('plays', videoRef)
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            console.log('pauses', videoRef)
            videoRef.current.pause();
        }
    };

    return (
        <div className='col-sm-12 col-md-10 col-lg-3'>
            <Card
                className="project-card text-white blur"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="video-container">
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        className="project-video"
                        muted
                        loop
                        controls={false}
                        onError={(e) => console.error('Video failed to load:', e)}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Card.Body className="d-flex flex-column">
                    <div className="card-content mb-4">
                        <Card.Title className='light-blue-text'>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 orange-text">{techStack}</Card.Subtitle>
                        <Card.Text>{significance}</Card.Text>
                    </div>
                    <div className='d-flex justify-content-between mt-auto'>
                        <FancyButton text={smallDevice ? 'More' : 'Read More'} handleClick={() => navigate(projectUrl)} />
                        {live && <FancyButton text='Live' handleClick={() => window.open(live, '_blank')} />}
                        <FancyButton icon={'mingcute:github-line'} handleClick={() => window.open(gitUrl, '_blank')} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProjectCard;
