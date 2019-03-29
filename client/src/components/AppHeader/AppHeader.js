import React from 'react';
import { Button } from 'react-bootstrap';


const AppHeader = props => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>This is AppHeader</h1>
            <Button variant="primary" size="lg" block>Test Button</Button>
        </div>
    );
}

export default AppHeader;