import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";

class Delete extends Component {
    async componentDidMount() {
        const { id } = this.props.match.params;
        let response = await http.deleteApi(`/orders/${id}`);
        this.props.history.push("/allProducts");
    }
    render() {
        return "";
    }
}
export default Delete;