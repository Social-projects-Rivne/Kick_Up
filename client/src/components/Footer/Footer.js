import React from 'react';
import './style.scss'
import { Col } from 'react-bootstrap';

const footer = props => {
    return (
        <footer className="footer-content">
            <Col className="privacy-policy">
                <a href="#">Privacy Policy</a>
            </Col>
            <Col className="copyright">
                &copy; {new Date().getFullYear()}{" "}Copyright: <a href="/">KickUp</a>
            </Col>
        </footer>
    );
};

export default footer;