import React from 'react';
import { withRouter } from 'react-router-dom'

import AppHeader from './../../components/AppHeader/AppHeader';

const pageContainer = props => {
    return (
        <>
            <AppHeader />
            {props.children}
        </>
    );
}

export default withRouter(pageContainer);