import axios from 'axios';

import jwt_decode from 'jwt-decode';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const loginUser = (user) => {
    console.log('user', user)
    return axios.post('/api/signin', user)
        .then(res => {
            console.log('login response data=>', res.data);
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            this.props.history.push({
                pathname: '/',
                state: {
                  token: decoded
                }
            });
        })
        .catch(err => console.log(err));
}