import React, { Component } from 'react';

import { loginUser } from './../../authentication';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email,  password } = this.state;
        const user = {
            email,
            password,
        }
        loginUser(user);
    }
    render() {
        console.log('this.props', this.props)
        return (
            <div className="container">
                <h2 style={{marginBottom: '40px', color: 'white'}}>Please sign in</h2>
                <form onSubmit={this.handleSubmit} style={{ maxWidth: "400px" }}>
                    <div className="form-group">
                        <input type="email" name="email" 
                        placeholder="Email" required autoFocus 
                        value={ this.state.email }
                        onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" 
                        placeholder="Password"
                        value={ this.state.password }
                        onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-lg btn-secondary btn-block" 
                        type="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;