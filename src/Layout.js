import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortofolioNavbar from './javascript/components/navbar';
import Home from './javascript/views/home';
import ThreeScene from './javascript/three/scene';
import About from './javascript/views/about';
import React from 'react';

const Layout = () => { 
    return (
        <>
            <BrowserRouter>
                <PortofolioNavbar />
                <ThreeScene></ThreeScene>
                <div className='content bg-transparent mt-nav p-0'>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<About />} path="/about" />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default Layout;