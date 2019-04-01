import logo from './logo.png';
import React from 'react';
import './AppHeader.scss'
import { Navbar,  FormControl, Form, Nav, InputGroup } from 'react-bootstrap';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AppHeader = props => {
    return (
        <Navbar collapseOnSelect expand="lg" className = 'header'>
            <Navbar.Brand href="/" className="mobile-logo d-block d-lg-none">
                <img className = 'logoImg' src={logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav inline className="header-content">
                    <div className="search-row">
                        <Navbar.Brand href="/" className="site-logo d-none d-lg-block">
                            <img className = 'logoImg' src={logo} alt="Logo" />
                        </Navbar.Brand>
                        <Form inline className="search-form">
                            <InputGroup>
                                <FormControl className="search-field" placeholder="Search"/>
                            </InputGroup>
                        </Form>
                    </div>
                     <div className="align-center">
                        <Nav.Link href="/events" className="fa-icon">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </Nav.Link>

                        <Nav.Link href="/rooms" className="fa-icon">
                            <FontAwesomeIcon icon={faUsers} />
                        </Nav.Link>
                    </div>
                    <div className="align-right">
                        <Nav.Link href="/register" className="fa-icon">
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </Nav.Link>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppHeader;