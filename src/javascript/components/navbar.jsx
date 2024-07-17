import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

const PortofolioNavbar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand='lg' variant="dark" className="bg-body-tertiary fixed-top bg-transparent">
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/about" className="text-white">About Me</Nav.Link>
                            <Nav.Link as={Link} to="/projects" className="text-white">Projects</Nav.Link>
                            <Nav.Link as={Link} to="/experience" className="text-white">Experience</Nav.Link>
                            <Nav.Link as={Link} to="/contact-me" className="text-white">Contact Me</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default PortofolioNavbar;
