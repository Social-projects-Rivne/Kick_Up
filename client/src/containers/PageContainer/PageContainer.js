import React from 'react';
import { withRouter } from 'react-router-dom';

import AppHeader from './../../components/AppHeader/AppHeader';
import Footer from './../../components/Footer/Footer';
import Notifier from "../../components/UI/Snackbar/Notifier";

const pageContainer = props => {
    return (
        <>
            <Notifier />
            <AppHeader signOutApp={props.signOutApp} />
            <main id="content">{props.children}</main>
            <Footer />
        </>
    );
}

export default withRouter(pageContainer);
