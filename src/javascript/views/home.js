import React from 'react';
import ThreeScene from '../scene';
import "../../styles/home.css"
import title from "../../img/title.png"
import FancyButton from '../components/button.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='mt-0'>
            <ThreeScene />
            <div className='content bg-transparent d-flex flex-column align-items-center justify-content-center mt'>
                <img src={title} className='w-30 mb-3'></img>
                <div className='d-flex justify-content-between w-30'>
                    <FancyButton icon={'mingcute:code-line'} text={'Discover My Projects'} handleClick={() => navigate('/projects')}/>
                    <div className='d-flex gap-2'>
                        <FancyButton icon={'mingcute:github-line'} handleClick={() => window.open('https://github.com/BlondyMartinez', '_blank')}></FancyButton>
                        <FancyButton icon={'ri:linkedin-line'} handleClick={() => window.open('https://www.linkedin.com/in/blondy-martinez/', '_blank')}></FancyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;