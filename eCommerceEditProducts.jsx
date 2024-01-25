import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import { Link } from "react-router-dom";
class Edit extends Component {
    state = {
        editProducts: { name: "", description: "", price: "", imgLink: "", category: "" },
        edit: false
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.editProducts[input.name] = input.value;
        this.setState(s1);
    }

    async fetchData() {
        let { id } = this.props.match.params;
        if (id) {
            let response = await http.get(`/products/${id}`);
            let { data } = response;
            this.setState({ editProducts: data, edit: true });
        } else {
            let newProd = { name: "", description: "", price: "", imgLink: "", category: "" };
            this.setState({ editProducts: newProd, edit: false });
        }
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
        this.props.history.push("/Manage Products")
    }
    async putData(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        this.props.history.push("/Manage Products")
    }
    handleSave = (e) => {
        e.preventDefault();
        let { editProducts, edit } = this.state;
        let { id } = this.props.match.params;
        edit ? this.putData(`/products/${id}`, editProducts) : this.postData("/products", editProducts);
    }

    handleDelete = (id) => {
        this.props.history.push(`/products/${id}/delete`)
    }

    render() {
        let { name, description, price, imgLink, category } = this.state.editProducts;
        const allCategories = ["Sunglasses", "Watches", "Belts", "Handbags", "Wallets", "Formal Shoes", "Sport Shoes", "Floaters", "Sandals"];
        let { id } = this.props.match.params;
        let { edit } = this.state;
        return (
            <div className="container bg-light">
                <div className="row">
                    <h2 className="text-center mt-3 mb-3">{edit === true ? "Edit Products" : "Add New Product"}</h2>
                    {edit === true && (
                        <div className="col-sm-6">
                            <div className="card bg-dark text-white p-2" style={{ width: '28rem' }}>
                                <img className="card-img-top" src={imgLink} alt="Card image cap" />
                                <div className="card-body">
                                    <b>{name}</b> <br />
                                    <p className="card-text" >Category : {category}</p>
                                    <p className="card-text">Price : Rs.{price}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={edit === true ? "col-sm-6" : "col-sm-12"}>
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
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Description</b></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    value={description}
                                    placeholder="Enter description"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Price</b></label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="price"
                                    value={price}
                                    placeholder="Enter price"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Image</b></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="imgLink"
                                    value={imgLink}
                                    placeholder="Enter imgLink"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Category</b></label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={category}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {allCategories.map((ele) => (
                                        <option key={ele} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                        <button className="btn btn-primary mt-3" onClick={this.handleSave}>{edit === true ? "Save" : "Add"}</button>
                        {edit === true && <button className="btn btn-secondary mt-3 ms-3" onClick={() => this.handleDelete(id)}>Delete</button>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Edit;