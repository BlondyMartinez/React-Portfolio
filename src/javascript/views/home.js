import React from 'react';
import ThreeScene from '../scene';
import "../../styles/home.css"
import title from "../../img/title.png"
import pic from "../../img/pic.png"

const Home = () => {
    return (
        <div>
            <ThreeScene />
            <div className='content bg-transparent d-flex align-items-center justify-content-center mt-5'>
                <img src={title} className='w-30'></img>
            </div>
        </div>
    );
};

export default Home;