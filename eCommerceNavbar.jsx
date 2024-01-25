import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import auth from "./httpServiceEcommerceAuth.js";
import { Link } from "react-router-dom";
class Navbar extends Component {
    state = {
        orders: []
    }
    async fetchData() {
        let response = await http.get("/orders");
        let { data } = response;
        this.setState({ orders: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
        }
    }
    render() {
        let footWear = ["Formal Shoes", "Sport Shoes", "Floaters", "Sandals"];
        let loginDet = ["My Orders", "Manage Products", "Logout"];
        let totalQty = this.state.orders.reduce((acc, curr) => curr.qty + acc, 0);
        let user = auth.getUser();
        let user1 = auth.getUser1();

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand ms-3">My Store</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/watches" className="nav-link">Watches</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sunglasses" className="nav-link">Sunglasses</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/belts" className="nav-link">belts</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/handbags" className="nav-link">Handbags</Link>
                    </li>

                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                            Footwear
                        </a>
                        <div className="dropdown-menu">
                            {footWear.map((ele, index) => (
                                <Link to={`/footwear/${ele}`} key={index} className="dropdown-item">{ele}</Link>
                            ))}
                        </div>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto me-3">
                    {!user1 && !user && (
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    )}
                    {!user && user1 && (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                {user.email}
                            </a>
                            <div className="dropdown-menu">
                                {loginDet.map((ele, index) => (
                                    <Link to={`/${ele}`} key={index} className="dropdown-item">{ele}</Link>
                                ))}
                            </div>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            Cart
                            {this.state.orders.length > 0 ?
                                <span className="bg-warning text-white p-1 ms-2">{totalQty}</span> :
                                <span className="bg-success text-white p-1 ms-2">0</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default Navbar;