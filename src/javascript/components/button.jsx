import React from "react";
import '../../styles/button.css';
import { Icon } from "@iconify/react/dist/iconify.js";

const FancyButton = (props) => {
    return(
        <button className="button d-flex align-items-center gap-2" onClick={props.handleClick}>
            {props.icon && <Icon className='fs-3' icon={props.icon} />}
            {props.text}
        </button>
    );
}

export default FancyButton;