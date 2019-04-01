import React from 'react';
import { withRouter } from 'react-router-dom'

import AppHeader from './../../components/AppHeader/AppHeader';

const pageContainer = props => {
    return (
        <div className="app-wrapper  spring-warmth-gradient">
            <AppHeader />
            {props.children}
        </div>
    );
}

export default withRouter(pageContainer);