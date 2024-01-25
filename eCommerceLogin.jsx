import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import auth from "./httpServiceEcommerceAuth.js";
import { Link } from "react-router-dom";
class Login extends Component {
    state = {
        newCustomer: { email: "", password: "" },
        errors: {},
        errMsgs: ""
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.newCustomer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async register(url, obj) {
        try {
            let response = await http.post(url, obj);
            let { data } = response;
            let user1 = auth.getUser1();
            if (user1) {
                auth.login(data);
                this.props.history.push("/summary");
            }else{
                this.props.history.push("/register");
            }
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                alert(ex.response.data);
                // this.setState({ errMsgs: ex.response.data });
            }
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.register("/login", newCustomer);
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }
    }

    isValid = (error) => {
        let key = Object.keys(error);
        let count = key.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { email, password } = this.state.newCustomer;
        let errors = {};
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => !password ? "Password is required" : "";

    render() {
        let { email, password } = this.state.newCustomer;
        let { errors } = this.state;

        return (
            <div className="container bg-light">
                <div className="row">
                    <img src="https://raw.githubusercontent.com/edufectcode/react/main/data/MyStore-sale.jpg" alt="" />
                    <h2 className="text-center mt-3 mb-3">Login</h2>

                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <form>
                            <div className="form-group">
                                <label><b>Email</b></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="Enter Email"
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusValidation}
                                />
                                {errors.email && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label><b>Password</b></label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusValidation}
                                />
                                {errors.password && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.password}</span>}
                            </div>
                            <button className="btn btn-primary mt-3" onClick={this.handleLogin}>Login</button>
                        </form>
                    </div>
                    <div className="col-sm-3"></div>

                </div>
            </div>
        )
    }
}
export default Login;