import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import auth from "./httpServiceEcommerceAuth.js"
import { Link } from "react-router-dom";
class Register extends Component {
    state = {
        newCustomer: { name: "", email: "", password: "", user: "" },
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
            auth.register(data)
            this.props.history.push("/login");
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                alert(ex.response.data);
                // this.setState({ errMsgs: ex.response.data });
            }
        }
    }

    handleRegister = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.register("/register", newCustomer);
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
        let { name, email, password, user } = this.state.newCustomer;
        let errors = {};
        errors.name = this.handleName(name);
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        errors.user = this.handleUser(user);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            case "user": s1.errors.user = this.handleUser(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleName = (name) => !name ? "Name is required" : "";
    handleEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => !password ? "Password is required" : "";
    handleUser = (user) => !user ? "User is required" : "";

    render() {
        let { name, email, password, user } = this.state.newCustomer;
        let { errors } = this.state;

        return (
            <div className="container bg-light">
                <div className="row">
                    <img src="https://raw.githubusercontent.com/edufectcode/react/main/data/MyStore-sale.jpg" alt="" />
                    <h2 className="text-center mt-3 mb-3">Register</h2>

                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <form>
                            <div className="form-group">
                                <label><b>Name</b></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Enter Name"
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusValidation}
                                />
                                {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>}
                            </div>
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
                            <div className="form-group">
                                <label><b>User</b></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="user"
                                    value={user}
                                    placeholder="Enter User Type"
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusValidation}
                                />
                                {errors.user && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.user}</span>}
                            </div>
                            <button className="btn btn-primary mt-3" onClick={this.handleRegister}>Register</button>
                        </form>
                    </div>
                    <div className="col-sm-3"></div>

                </div>
            </div>
        )
    }
}
export default Register;