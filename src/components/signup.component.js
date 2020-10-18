import React, { Component } from "react";
const axios = require('axios');
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {successMsg: 0, errMsg: ''};

    }
    
    handleSubmit = async e => {
        console.log(localStorage.getItem('jwsToken'));
        console.log(process.env.development);
        var self = this;
        e.preventDefault();
        this.setState({successMsg: 1});
        const data = {
            email: this.email,
            password: this.password,
            name: this.fullname
        }
        // console.log(" data ", data);
        axios.post('http://localhost:3000/register', data)
        .then(function (response) {
            // console.log(response.data.token);
            localStorage.setItem('jwsToken', response.data.token);
            self.setState({
                successMsg:1
            })
        })
        .catch(function (error) {
            let errors = '';
            console.log(error.response.data.errors);
            if(error.response.data.errors.msg.length){
                console.log(" if ") 
                errors = error.response.data.errors.msg[0].msg
            } else {
                console.log(" else ")
                errors = error.response.data.errors.msg
            }
           
            if(typeof errors === 'undefined')
                errors = error.response.data.errors.msg
            self.setState({
                successMsg:0,
                errMsg: errors
            })
        });

        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div style={{ color: this.state.successMsg ? 'green' : 'red' }}> {this.state.successMsg ? 'Registered successfully ' : this.state.errMsg} </div>
                <div className="form-group">
                    <label> Name</label>
                    <input type="text" className="form-control" placeholder="Full name" onChange={e=>this.fullname = e.target.value} required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e=>this.email = e.target.value} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e=>this.password = e.target.value} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}