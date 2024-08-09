import React from "react";
import { Row, Col } from 'react-bootstrap';
import SVGIcon from "../components/icon";
import useScreenWidth from "../hooks/useScreenWidth.jsx";
import FancyButton from "../components/button.jsx";
import SWImg from '../../img/sw-phone.png'

const codeSnippet = {

}

function StarWars() {
    const smallDevice = useScreenWidth();

    return (
        <div className={`card ${smallDevice ? 'my-5 p-2' : 'm-5'}`}>
            <Row className="my-4 light-blue-text">
                <Col>
                    <h1 className="text-center">Star Wars Wiki</h1>
                    <div className={`d-flex ${smallDevice ? 'flex-column justify-content-center align-items-center' : 'justify-content-between'}`}>
                        <div>
                            <SVGIcon iconName={'react'} />
                            <SVGIcon iconName={'rrd'} classes={'ps-3'} />
                            <SVGIcon iconName={'flux'} classes={'ps-3'} />
                            <SVGIcon iconName={'sass'} classes={'ps-3'} />
                        </div>
                        <div className="d-flex gap-3">
                            <FancyButton text='Live' icon={'mingcute:github-line'} handleClick={() => window.open('https://star-wars-wiki-gray.vercel.app/', '_blank')} />
                            <FancyButton text={smallDevice ? '' : 'Repository'} icon={'mingcute:github-line'} handleClick={() => window.open('https://github.com/BlondyMartinez/StarWars-Wiki', '_blank')} />
                        </div>
                    </div>
                    <p className={`light-blue-text ${smallDevice ? 'text-center' : ''}`}>Developed using SWAPI.tech</p>
                </Col>
            </Row>
        
            <Row className="my-4 text-white">
                <Col xs={12} lg={7}>
                    <h3 className="orange-text">Overview</h3>
                    <p>
                        Star Wars Wiki is a comprehensive web application built with React, offering a rich and immersive experience for fans of the iconic Star Wars franchise. 
                        Users can delve into the vast universe, exploring detailed information about characters, planets, starships, vehicles, species, and films.
                    </p>

                    <h3 className="pt-5 orange-text">Features</h3>
                    <ul>
                        <li><strong>Extensive Data:</strong> Explore detailed information about various aspects of the Star Wars universe, including characters, planets, starships, vehicles, species, and films.</li>
                        <li><strong>User-Friendly Interface:</strong> Navigate seamlessly through the application with an intuitive and visually appealing user interface.</li>
                        <li><strong>Favorites:</strong> Easily manage your favorite items and keep track of them using the favorites feature.</li>
                        <li><strong>Responsive Design:</strong> Enjoy a consistent experience across devices with responsive design optimized for desktop and mobile.</li>
                        <li>Functional search and data saved on browser storage.</li>
                    </ul>
                </Col>
                <Col>
                    <img src={SWImg} className="img-fluid"></img>
                </Col>
            </Row>
        </div>
    );
}
  
export default StarWars;
  