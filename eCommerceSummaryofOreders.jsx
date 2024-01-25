import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import { Link } from "react-router-dom";
class Summary extends Component {
    state = {
        orders: [],
        orderForm: { name: "", addressLine1: "", addressLine2: "", city: "", qty: "", totalValue: "" }
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.orderForm[input.name] = input.value;
        // this.handleFocusValidation(e);
        this.setState(s1);
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

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/thankYouPage");
    }

    handleSubmit = (e) => {
        e.preventDefault(e);
        let { orderForm, orders } = this.state;

        orderForm.qty = orders.reduce((acc, curr) => curr.qty + acc, 0);
        orderForm.totalValue = orders.reduce((acc, curr) => curr.price * curr.qty + acc, 0);
        
        this.postData("/orderDetails", orderForm);
    }

    render() {
        let { orders } = this.state;
        let { name, addressLine1, addressLine2, city, qty, totalValue } = this.state.orderForm;
        let totalPrice = orders.reduce((acc, curr) => curr.price * curr.qty + acc, 0);
        let totalQty = orders.reduce((acc, curr) => curr.qty + acc, 0);

        return (
            <div className="container bg-light">
                <div className="row">
                    <img src="https://raw.githubusercontent.com/edufectcode/react/main/data/MyStore-sale.jpg" alt="" />
                    <div className="row border">
                        <h2 className="text-center">Summary of your Order</h2>
                        {orders.length > 0 ? (<h4 className="text-center mt-3">You order has {totalQty} items</h4>) :
                            (<h4 className="text-center mt-3">You order has {orders.length} items</h4>)}
                        {orders.length > 0 &&
                            <React.Fragment>
                                <div className="row border bg-dark text-white mt-2 text-center p-2">
                                    <div className="col-sm-4">Name</div>
                                    <div className="col-sm-4">Quantity</div>
                                    <div className="col-sm-4">Value</div>
                                </div>
                                {orders.map((ele) => (
                                    <div className="row border text-center p-2" key={ele.id}>
                                        <div className="col-sm-4">{ele.name} </div>
                                        <div className="col-sm-4">{ele.qty}</div>
                                        <div className="col-sm-4">Rs.{ele.price * ele.qty}</div>
                                    </div>
                                ))}
                                <div className="row border text-center p-2">
                                    <div className="col-sm-4">Total</div>
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4">Rs.{totalPrice}.00</div>
                                </div>
                            </React.Fragment>
                        }
                    </div>

                    <div className="row mt-3 mb-3">
                        <h2 className="text-center">Delievery Details</h2>
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
                                {/* {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>} */}
                            </div>
                        </form>
                        <div className="form-group">
                            <label><b>Address</b></label>
                            <input
                                className="form-control"
                                type="text"
                                name="addressLine1"
                                value={addressLine1}
                                placeholder="line1"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {/* {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>} */}
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="addressLine2"
                                value={addressLine2}
                                placeholder="line2"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {/* {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>} */}
                        </div>
                        <div className="form-group">
                            <label><b>City</b></label>
                            <input
                                className="form-control"
                                type="text"
                                name="city"
                                value={city}
                                placeholder="Enter city"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {/* {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>} */}
                        </div>
                    </div>
                </div>
                <button className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
            </div>

        )
    }
}
export default Summary;