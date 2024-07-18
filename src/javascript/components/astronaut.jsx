import React from "react";
import selfie from '../../img/astronaut.png'
import '../../styles/astronaut.css'

const Astronaut = () => {
    return(
        <div className="astronaut-container">
           <img src={selfie}></img>
        </div>
    );
}

export default Astronaut;