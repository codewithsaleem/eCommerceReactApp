import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import queryString from "query-string";
class Sunglasses extends Component {
    state = {
        products: [],
        cartProduct: [],
        orders: []
    }

    async fetchData() {
        let response = await http.get("/products");
        let { data } = response;
        data = data.map((item) => ({ ...item, qty: 1 }));
        this.setState({ products: data });
    }
    async fetchData1() {
        let response = await http.get("/orders");
        let { data } = response;
        this.setState({ orders: data });
    }
    componentDidMount() {
        this.fetchData();
        this.fetchData1();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
            this.fetchData1();
        }
    }

    handleRemovefromcart = (id) => {
        this.props.history.push(`/orders/${id}`);
    }

    handleAddtocart = (id) => {
        let { products } = this.state;
        let fndProduct = products.find((ele) => ele.id === id)
        if (fndProduct) {
            this.postData("/orders", fndProduct);
        }
    }
    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/allProducts");
    }

    render() {
        let { products, orders } = this.state;
        let filt = products.filter((ele) => ele.category === "Sunglasses");
        return (
            <div className="container" style={{backgroundColor: 'seashell'}}>
                <div className="row no-gutters">
                    <img src="https://raw.githubusercontent.com/edufectcode/react/main/data/MyStore-sale.jpg" alt="" />

                    <div className="col-12">
                        <div className="row no-gutters">
                            {filt.map((ele, index) => (
                                <div className="col-4">
                                    <div className="card h-100 w-100">
                                        <img className="card-img-top h-50" src={ele.imgLink} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{ele.name}</h5>
                                            <p className="card-text">Rs.{ele.price}</p>
                                            <p className="card-text">
                                                {/* <!-- Inline level --> */}
                                                <span className="d-inline-block text-truncate" style={{ maxWidth: '250px' }}>
                                                    "{ele.description}"
                                                </span>
                                            </p>
                                            {orders.length > 0 && orders.find((opt) => opt.id === ele.id) ?
                                                <a className="btn btn-warning form-control" onClick={() => this.handleRemovefromcart(ele.id)}>Remove From Cart</a> :
                                                <a className="btn btn-success form-control" onClick={() => this.handleAddtocart(ele.id)}>Add To Cart</a>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default Sunglasses;