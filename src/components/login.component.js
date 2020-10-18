import React, { Component } from "react";
const axios = require('axios');
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {successMsg: 0, errMsg: ''};

    }

    handleSubmit = e => {
        e.preventDefault();
        var self = this;
        const data = {
            email: this.email,
            password: this.password
        }
        console.log(" data ", data);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('jwsToken')
        }
        console.log(" headers ", headers);
        axios.post('http://localhost:3000/login', data,{headers: headers})
        .then(function (response) {
            console.log(response.data);
            self.setState({
                successMsg:1
            })
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                self.setState({
                    successMsg:0,
                    errMsg: 'Unauthorized'
                })
            } else if(error.response.status === 409) {
                self.setState({
                    successMsg:0,
                    errMsg: error.response.data.errors.msg
                })
            }
            console.log(error.response);
        });
    }
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>
                <div style={{ color: this.state.successMsg ? 'green' : 'red' }}> {this.state.successMsg ? 'Login successfully ' : this.state.errMsg} </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  onChange={e=>this.email = e.target.value} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e=>this.password = e.target.value} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}