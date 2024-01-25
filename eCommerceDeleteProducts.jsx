import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";

class DeleteProd extends Component {
    async componentDidMount() {
        const { id } = this.props.match.params;
        let response = await http.deleteApi(`/products/${id}`);
        window.location = "/Manage Products";
    }
    render() {
        return "";
    }
}
export default DeleteProd;