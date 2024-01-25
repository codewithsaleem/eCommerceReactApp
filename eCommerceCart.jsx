import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import auth from "./httpServiceEcommerceAuth.js"
import { Link } from "react-router-dom";
class Cart extends Component {
    state = {
        orders: [],
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
        this.props.history.push("/cart");
    }
    handleAddToCart = (id) => {
        let { orders } = this.state;
        let fnd = orders.find((ele) => ele.id === id);
        this.postData("/orders", fnd)
    };

    async deleteData(url) {
        let response = await http.deleteApi(url);
        let { data } = response;
        this.props.history.push("/cart");
    }

    handleRemoveFromCart= (id) => {
        let { orders } = this.state;
        let fnd = orders.find((ele) => ele.id === id);
        this.deleteData(`/orders/${id}`, fnd)
    };
  
    hanldeCheckOut = () => {
        let user = auth.getUser();
        user ? this.props.history.push("/summary") : this.props.history.push("/registers");
    }

    render() {
        let { orders } = this.state;
        let totalPrice = orders.reduce((acc, curr) => curr.price * curr.qty + acc, 0);
        let totalQty = orders.reduce((acc, curr) => curr.qty + acc, 0);

        return (
            <div className="container bg-light">
                <div className="row">
                    <img src="https://raw.githubusercontent.com/edufectcode/react/main/data/MyStore-sale.jpg" alt="" />
                    {orders.length > 0 ? (<h2 className="text-center mt-3">You have {totalQty} items in the cart</h2>) :
                        (<h2 className="text-center mt-3">You have {orders.length} items in the cart</h2>)}
                    {orders.length > 0 &&
                        <React.Fragment>
                            <div className="row">
                                <div className="col-sm-4"> <h4>Cart Value : Rs.{totalPrice}.00</h4></div>
                                <div className="col-sm-6"></div>
                                <div className="col-sm-2">
                                    <button className="btn btn-primary btn-lg" onClick={() => this.hanldeCheckOut()}>Check Out</button>
                                </div>
                            </div>

                            <div className="row border bg-dark text-white mt-2">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-5">Product Details</div>
                                <div className="col-sm-2">Quantity</div>
                                <div className="col-sm-2">Price</div>
                            </div>
                            {orders.map((ele) => (
                                <div className="row border" key={ele.id}>
                                    <div className="col-sm-3">
                                        <img className="card-img-top h-50 w-50 rounded-2" src={ele.imgLink} alt="Card image cap" />
                                    </div>
                                    <div className="col-sm-5">
                                        <b>
                                            {ele.name} <br />
                                            {ele.category} <br />
                                        </b>
                                        {ele.description}
                                    </div>
                                    <div className="col-sm-2 mt-2">
                                        <button className="btn btn-success btn-sm m-2" onClick={() => this.handleAddToCart(ele.id)}><i className="fa-solid fa-plus"></i></button>
                                        {ele.qty}
                                        <button className="btn btn-warning btn-sm m-2" onClick={() => this.handleRemoveFromCart(ele.id)}><i className="fa-solid fa-minus"></i></button>
                                    </div>
                                    <div className="col-sm-2">Rs.{ele.price * ele.qty}</div>
                                </div>
                            ))}
                        </React.Fragment>
                    }
                </div>
            </div>

        )
    }
}
export default Cart;