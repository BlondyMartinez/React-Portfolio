import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import '../../styles/navbar.css';

const PortofolioNavbar = () => {
    return (
        <>
            <Navbar className="bg-body-tertiary fixed-top bg-transparent">
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#about-me" className="text-white">About Me</Nav.Link>
                            <Nav.Link href="#projects" className="text-white">Projects</Nav.Link>
                            <Nav.Link href="#experience" className="text-white">Experience</Nav.Link>
                            <Nav.Link href="#contact-me" className="text-white">Contact Me</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default PortofolioNavbar;
