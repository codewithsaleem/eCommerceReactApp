import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import { Link } from "react-router-dom";
class ListOrders extends Component {
    state = {
        orders: [],
    }
    async fetchData() {
        let response = await http.get("/orderDetails");
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
        let { orders } = this.state;

        return (
            <div className="container bg-light">
                <div className="row">
                    <img src="https://raw.githubusercontent.com/edufectcode/react/main/data/MyStore-sale.jpg" alt="" />
                    <div className="row mt-3">
                        <h2 className="">List of Orders</h2>
                        {orders.length > 0 &&
                            <React.Fragment>
                                <div className="row border bg-dark text-white mt-2 p-2">
                                    <div className="col-sm-3">Name</div>
                                    <div className="col-sm-2">City</div>
                                    <div className="col-sm-3">Address</div>
                                    <div className="col-sm-2">Amount</div>
                                    <div className="col-sm-2">Items</div>
                                </div>
                                {orders.map((ele, index) => (
                                    <div className="row border p-2" key={index}>
                                        <div className="col-sm-3">{ele.name} </div>
                                        <div className="col-sm-2">{ele.city} </div>
                                        <div className="col-sm-3">{ele.addressLine1}</div>
                                        <div className="col-sm-2">Rs.{ele.totalValue}.00</div>
                                        <div className="col-sm-2">{ele.qty}</div>
                                    </div>
                                ))}
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>

        )
    }
}
export default ListOrders;