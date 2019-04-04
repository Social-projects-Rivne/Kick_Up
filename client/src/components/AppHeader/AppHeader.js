import React from 'react';

import '../../styles/index.scss';

import { Link } from "react-router-dom";
import { Navbar,  FormControl, Form, Nav, InputGroup } from 'react-bootstrap';
import { faSignInAlt, faSignOutAlt, faUserPlus, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../../assets/img/logo.png';

const AppHeader = props => {
    const handleLogout = () => {
        // TODO: logout
    }
    const authForm = props.isAuthenticated
        ? <div className="align-right">
            <Link onClick={handleLogout} className="fa-icon">
                <FontAwesomeIcon icon={faSignOutAlt} />  
            </Link>
        </div>
        : <div className="align-right">
            <Link to="/sign-up" className="fa-icon">
                <FontAwesomeIcon icon={faUserPlus} />
            </Link>
            <Link to="/sign-in" className="fa-icon">
                <FontAwesomeIcon icon={faSignInAlt} />
            </Link>    
        </div>
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
                        <Link to="/events" className="fa-icon">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </Link>

                        <Link to="/rooms" className="fa-icon">
                            <FontAwesomeIcon icon={faUsers} />
                        </Link>
                    </div>
                    {authForm}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppHeader;
