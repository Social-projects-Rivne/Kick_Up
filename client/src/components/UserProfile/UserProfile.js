import React from 'react';
import { Link } from 'react-router-dom';

const userProfile = props => (
    <div>
        <Link to={props.location.pathname + "/edit"} >Edit Profile</Link>
    </div>
)

export default userProfile;