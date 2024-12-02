import React from "react";
import Astronaut from "../components/astronaut.jsx";
import "../../styles/about.css";
import SkillCategory from "../components/skill.jsx";

function About() {
  return (
    <div className="about-container d-flex justify-content-center">
      <Astronaut></Astronaut>

      <div className="about-content d-flex flex-column mb-3">
        <h1 className="light-blue-text fw-800 glow">About Me</h1>
        <div className="card">
          <span className="p-3 text-white fs-5">
            Hello! I'm a <span className="orange-text fw-800">versatile</span>{" "}
            full-stack developer with a background in{" "}
            <span className="orange-text fw-800">
              computer games programming
            </span>
            . Proficient in both{" "}
            <span className="orange-text fw-800">front-end</span> and{" "}
            <span className="orange-text fw-800">back-end</span> development, I
            also have experience in{" "}
            <span className="orange-text fw-800">testing</span> and design
            software.
            <br></br>
            <br></br>
            I'm eager to use my skills to turn your ideas into reality!
          </span>
        </div>

        <h1 className="light-blue-text fw-800 mt-3 glow">Skills</h1>
        <div className="card">
          <div className="row">
            <SkillCategory
              category="Frontend"
              skills={["html", "css", "js", "ts", "react", "bootstrap"]}
            />
            <SkillCategory
              category="Backend"
              skills={["py", "ruby", "flask", "sqla", "postgresql"]}
            />
            <SkillCategory category="Testing" skills={["rspec", "jest"]} />
            <SkillCategory
              category="Other"
              skills={["cpp", "ue", "cs", "unity", "ps", "git"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
