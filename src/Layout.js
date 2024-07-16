import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortofolioNavbar from './javascript/components/navbar';
import Home from './javascript/views/home';
import Experience from './javascript/views/experience';
import React from 'react';

const Layout = () => { 
    return (
        <>
            <BrowserRouter>
                <PortofolioNavbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Layout;