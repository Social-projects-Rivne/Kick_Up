import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Link } from "@material-ui/core";

const Footer = props => {
    return (
        <footer className="footer-content">
            <div className="privacy-policy">
                <Link component={RouterLink} to="/privacy-policy">
                    Privacy Policy
                </Link>
            </div>
            <div className="copyright">
                &copy; {new Date().getFullYear()}{" "}Copyright:{" "}
                <Link component={RouterLink} to="/">KickUp</Link>
            </div>
        </footer>
    );
};

export default Footer;
