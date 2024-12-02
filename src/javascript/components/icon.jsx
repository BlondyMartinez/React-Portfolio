import React from "react";
import { ReactComponent as CS } from "../../svg/c--4.svg";
import { ReactComponent as CPP } from "../../svg/c.svg";
import { ReactComponent as JS } from "../../svg/javascript-svgrepo-com.svg";
import { ReactComponent as PY } from "../../svg/python-svgrepo-com.svg";
import { ReactComponent as RUBY } from "../../svg/ruby-svgrepo-com.svg";
import { ReactComponent as CSS } from "../../svg/css-3.svg";
import { ReactComponent as HTML } from "../../svg/html-1.svg";
import { ReactComponent as GIT } from "../../svg/git-icon.svg";
import { ReactComponent as FLASK } from "../../svg/flask.svg";
import { ReactComponent as JEST } from "../../svg/Jest.svg";
import { ReactComponent as PS } from "../../svg/photoshop-cc-4.svg";
import { ReactComponent as RSPEC } from "../../svg/RSpec.svg";
import { ReactComponent as SQLA } from "../../svg/SQLAlchemy.svg";
import { ReactComponent as UNITY } from "../../svg/Unity.svg";
import { ReactComponent as UE } from "../../svg/Unreal Engine.svg";
import { ReactComponent as REACT } from "../../svg/react-2.svg";
import { ReactComponent as POSTGRESQL } from "../../svg/postgresql-svgrepo-com.svg";
import { ReactComponent as BOOTSTRAP } from "../../svg/bootstrap-4.svg";
import { ReactComponent as SASS } from "../../svg/sass-1.svg";
import { ReactComponent as FLUX } from "../../svg/flux.svg";
import { ReactComponent as RRD } from "../../svg/react-router-svgrepo-com.svg";
import { ReactComponent as TS } from "../../svg/typescript-official-svgrepo-com.svg";

import "../../styles/skill.css";

const SVGIcon = ({ iconName, classes }) => {
  const svgMap = {
    cs: CS,
    cpp: CPP,
    js: JS,
    py: PY,
    ruby: RUBY,
    css: CSS,
    html: HTML,
    git: GIT,
    flask: FLASK,
    jest: JEST,
    ps: PS,
    rspec: RSPEC,
    sqla: SQLA,
    unity: UNITY,
    ue: UE,
    react: REACT,
    postgresql: POSTGRESQL,
    bootstrap: BOOTSTRAP,
    sass: SASS,
    flux: FLUX,
    rrd: RRD,
    ts: TS,
  };

  const IconComponent = svgMap[iconName];

  if (IconComponent) return <IconComponent className={`svg-icon ${classes}`} />;
};

export default SVGIcon;
