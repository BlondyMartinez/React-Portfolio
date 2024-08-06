import React from 'react';
import "../../styles/home.css"
import title from "../../img/title.png"
import FancyButton from '../components/button.jsx';
import { useNavigate } from 'react-router-dom';
import useScreenWidth from '../hooks/useScreenWidth.jsx';

const Home = () => {
    const navigate = useNavigate();
    const smallDevice = useScreenWidth();

    return (
        <div className='d-flex flex-column align-items-center justify-content-center height max-height overflow-hidden pt-5'>
            <img src={title} className='w-30 mb-3 opacity-80 pt-5 mt-5 invert'></img>
            <div className='d-flex justify-content-between w-30'>
                <FancyButton icon={'mingcute:code-line'} text={smallDevice ? 'Projects' : 'Discover My Projects'} handleClick={() => navigate('/projects')}/>
                   <div className='d-flex gap-2'>
                    <FancyButton icon={'mingcute:github-line'} handleClick={() => window.open('https://github.com/BlondyMartinez', '_blank')}></FancyButton>
                    <FancyButton icon={'ri:linkedin-line'} handleClick={() => window.open('https://www.linkedin.com/in/blondy-martinez/', '_blank')}></FancyButton>
                </div>
            </div>
        </div>
    );
};

export default Home;