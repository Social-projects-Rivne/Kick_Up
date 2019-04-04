import React from 'react';
import { withRouter } from 'react-router-dom'

import AppHeader from './../../components/AppHeader/AppHeader';
import Footer from './../../components/Footer/Footer';

const pageContainer = props => {
    return (
        <>
            <AppHeader />
            <main id="content">{props.children}</main>
            <Footer />
        </>
    );
}

export default withRouter(pageContainer);