import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='sm' className='justify-content-between w-100'>
                <Navbar.Brand href='#home'>CV Generator</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <Nav.Link href='#general'>General</Nav.Link>
                        <Nav.Link href='#education'>Education</Nav.Link>
                        <Nav.Link href='#experience'>Experience</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
