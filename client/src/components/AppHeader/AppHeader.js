import React from 'react';

import '../../styles/index.scss';

import { Link } from "react-router-dom";
import { Navbar,  FormControl, Form, Nav, InputGroup } from 'react-bootstrap';
import { faSignInAlt, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../../assets/images/logo.png';

const AppHeader = props => (
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
                        <Link to="/events" className="fa-icon">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </Link>

                        <Link to="/rooms" className="fa-icon">
                            <FontAwesomeIcon icon={faUsers} />
                        </Link>
                    </div>
                    <div className="align-right">
                        <Link to="/register" className="fa-icon">
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </Link>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

export default AppHeader;
