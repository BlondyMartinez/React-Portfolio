import React from "react";
import Astronaut from "../components/astronaut.jsx";
import "../../styles/about.css"
import SkillCategory from "../components/skill.jsx";

function About() {
    return (
        <div className="about-container d-flex justify-content-center align-items-center">
            <Astronaut></Astronaut>

            <div className="about-content d-flex flex-column justify-content-end mb-5">
                <h1 className="orange-text fw-800">About Me</h1>
                <div className="card">
                    <span className="p-3 text-white">Hello! I'm a <span className="orange-text fw-800">versatile</span> full-stack developer with a background in <span className="orange-text fw-800">computer games programming</span>. 
                        Proficient in both <span className="orange-text fw-800">front-end</span> and <span className="orange-text fw-800">back-end</span> development, I also have experience in <span className="orange-text fw-800">testing</span> and design software. 
                        <br></br><br></br>
                        I'm eager to use my skills to turn your ideas into reality!
                    </span>
                </div>

                
                <h1 className="orange-text fw-800 mt-3">Skills</h1>
                <div className="card">
                    <div className="row">
                        <SkillCategory category="Frontend" skills={['html', 'css', 'js', 'react']} />
                        <SkillCategory category="Backend" skills={['py', 'ruby', 'flask', 'sqla', 'postgresql']} />
                        <SkillCategory category="Testing" skills={['rspec', 'jest']} />
                        <SkillCategory category="Other" skills={['cpp', 'ue', 'cs', 'unity', 'ps', 'git']} />
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default About;
  