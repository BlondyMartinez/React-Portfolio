import React from "react";
import SVGIcon from "./icon";
import "../../styles/skill.css"

const SkillCategory = ({ category, skills }) => {
    const name = {
        cs: "C#",
        cpp: "C++",
        js: "Javascript",
        py: "Python",
        ruby: "Ruby",
        css: "CSS",
        html: "HTML",
        git: "Git",
        flask: "Flask",
        jest: "Jest",
        ps: "Photoshop",
        rspec: "RSpec",
        sqla: "SQLAlchemy",
        unity: "Unity",
        ue: "Unreal Engine",
        react: "React"
    };

    return (
        <div className="skill-category col-3">
            <h1 className="category-title orange-text mt-2">{category}</h1>
            <ul className="skill-list">
                {skills.map(skill => (
                    <li key={skill} className="skill-item">
                        <SVGIcon iconName={skill} />
                        <span className="skill-name text-white">{name[skill]}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillCategory;