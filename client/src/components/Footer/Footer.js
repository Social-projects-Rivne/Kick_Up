import React from 'react';

import '../../styles/index.scss';

import { Link as RouterLink } from 'react-router-dom';
import { Link } from "@material-ui/core";

const footer = props => {
    return (
        <footer className="footer-content">
            <div className="privacy-policy">
                <Link component={RouterLink} to="/privacypolicy">
                    Privacy Policy
                </Link>
            </div>
            <div className="copyright">
                <Link component={RouterLink} to="/">
                    &copy; {new Date().getFullYear()}{" "}Copyright: <a href="/">KickUp</a>
                </Link>
            </div>
        </footer>
    );
};

export default footer;
