import React from 'react';
import { withRouter } from 'react-router-dom'

import AppHeader from './../../components/AppHeader/AppHeader';
import Footer from './../../components/Footer/Footer';
import { SnackbarProvider } from 'notistack';

const pageContainer = props => {
    return (
        <>
            <SnackbarProvider maxSnack={3}>
                <AppHeader 
                    isAuthenticated={props.isAuthenticated} 
                    userHasAuthenticated={props.userHasAuthenticated}
                    user={props.user}
                />
                <main id="content">{props.children}</main>
                <Footer />
            </SnackbarProvider>
        </>
    );
}

export default withRouter(pageContainer);