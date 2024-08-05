import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import brand from '../../img/home.png'

const PortofolioNavbar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand='lg' variant="dark" className="bg-body-tertiary fixed-top bg-transparent blur">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className='d-flex align-items-center'>
                        <img src={brand} className='brand-size ps-3'></img>
                        <div className='ps-2 d-flex flex-column justify-content-center'>
                            <h5 className='fw-light m-0 light-blue-text'>Blondy Martínez</h5>
                            <h6 className='fw-light m-0 orange-text'>Full Stack Developer</h6>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end blur p-3">
                        <Nav>
                            <Nav.Link as={Link} to="/about" className="text-white">About Me</Nav.Link>
                            <Nav.Link as={Link} to="/projects" className="text-white">Projects</Nav.Link>
                            <Nav.Link as={Link} to="/resume" className="text-white">Resume</Nav.Link>
                            <Nav.Link as={Link} to="/contact-me" className="text-white">Contact Me</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default PortofolioNavbar;
