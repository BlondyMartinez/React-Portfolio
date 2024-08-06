import React from 'react';
import ProjectCard from '../components/project-card';

const projects = [
    {
        title: 'Task It App',
        techStack: 'React, Flux, Flask, SQLAlchemy, Socket.IO, Google Maps API',
        significance: 'This project demonstrates my full-stack development skills by building a complex platform with real-time features, state management, and third-party integrations.',
        videoUrl: 'https://raw.githubusercontent.com/BlondyMartinez/React-Portfolio/master/src/videos/taskitapp.mp4', 
        gitUrl: 'https://github.com/BlondyMartinez/TaskItApp',
        projectUrl: '/projects/task-it-app',
    },
    {
        title: '3D Boid Simulation in Unreal Engine',
        techStack: 'Unreal Engine, C++, Blueprints',
        significance: 'Highlighted for its advanced use of C++ in Unreal Engine and the implementation of complex algorithms. This project demonstrates my capabilities in simulation and game development, particularly in performance optimization and AI behavior programming.',
        videoUrl: 'https://raw.githubusercontent.com/BlondyMartinez/React-Portfolio/master/src/videos/boidsimulation.mp4', 
        gitUrl: 'https://github.com/BlondyMartinez/Boids',
        projectUrl: '/projects/boid-simulation',
    },
    {
        title: 'StarWars Wiki',
        techStack: 'React, React Router Dom, Flux, SASS',
        significance: 'Included to showcase my ability to work with external APIs and manage state in a complex frontend application.',
        videoUrl: 'https://raw.githubusercontent.com/BlondyMartinez/React-Portfolio/master/src/videos/starwars.mp4',
        gitUrl: 'https://github.com/BlondyMartinez/StarWars-Wiki',
        projectUrl: '/projects/starwars-wiki',
        live: 'https://star-wars-wiki-gray.vercel.app/',
    },
    {
        title: 'Connect Four Console Game',
        techStack: 'Ruby, RSpec, TDD',
        significance: 'Showcases my proficiency in Test-Driven Development (TDD) and Ruby. This project is a good example of my approach to ensuring code reliability through testing.',
        videoUrl: 'https://raw.githubusercontent.com/BlondyMartinez/React-Portfolio/master/src/videos/connectfour.mp4', 
        gitUrl: 'https://github.com/BlondyMartinez/Ruby-TDD-ConnectFour',
        projectUrl: '/projects/connect-four',
        live: 'https://replit.com/@blondymartinezm/Ruby-TDD-ConnectFour',
    },
];

const Projects = () => {
    return (
        <div className="d-flex justify-content-center align-items-center max-height">
            <div className="row d-flex flex-wrap justify-content-around gx-5 mx-5">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        techStack={project.techStack}
                        significance={project.significance}
                        videoUrl={project.videoUrl}
                        projectUrl={project.projectUrl}
                        live={project.live}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;