import React from "react";
import { ReactComponent as CS } from '../../svg/c--4.svg';
import { ReactComponent as CPP } from '../../svg/c.svg';
import { ReactComponent as JS } from '../../svg/javascript-svgrepo-com.svg';
import { ReactComponent as PY } from '../../svg/python-svgrepo-com.svg';
import { ReactComponent as RUBY } from '../../svg/ruby-svgrepo-com.svg';
import "../../styles/skill.css"

const SVGIcon = ({ iconName }) => {
    const svgMap = {
        cs: CS,
        cpp: CPP,
        js: JS,
        py: PY,
        ruby: RUBY
    };
    
    const IconComponent = svgMap[iconName];
  
    if (IconComponent) return <IconComponent className='svg-icon' />;
  };
  
  export default SVGIcon;