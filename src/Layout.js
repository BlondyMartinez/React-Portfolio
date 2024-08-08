import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortofolioNavbar from './javascript/components/navbar';
import Home from './javascript/views/home';
import ThreeScene from './javascript/three/scene';
import About from './javascript/views/about';
import React from 'react';
import Resume from './javascript/views/resume';
import Projects from './javascript/views/projects';
import Boids from './javascript/views/boids';

const Layout = () => { 
    return (
        <>
            <BrowserRouter>
                <PortofolioNavbar />
                <ThreeScene></ThreeScene>
                <div className='content height max-height bg-transparent mt-nav p-0'>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Resume />} path="/resume" />
                        <Route element={<Projects />} path="/projects" />
                        <Route element={<Boids />} path="/projects/boid-simulation" />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default Layout;