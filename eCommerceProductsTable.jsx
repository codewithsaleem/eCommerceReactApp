import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import queryString from "query-string";
import Left from "./eCommerceLeft";

class ProductsTable extends Component {
    state = {
        products: [],
        name: "",
        filteredProducts: [],

    };

    async fetchData() {
        let response = await http.get("/products");
        let { data } = response;
        this.setState({ products: data });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
        }
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.name = input.value;
        this.setState(s1, () => {
            this.filterProducts();
        });
    };

    filterProducts = () => {
        const { name, products } = this.state;
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );
        this.setState({ filteredProducts });
    };

    handleEdit = (id) => {
        this.props.history.push(`/products/${id}/edit`)
    }

    handleDelete = (id) => {
        this.props.history.push(`/products/${id}/delete`)
    }

    handleAddProduct = () => {
        this.props.history.push("/addNewProduct");
    }
    render() {
        let { filteredProducts, products } = this.state;
        let filt = filteredProducts.length !== 0 ? filteredProducts : products
        let filtLength = filteredProducts.length !== 0 ? filteredProducts.length : products.length;

        return (
            <div className="container mt-3 bg-light">
                <button className="btn btn-success" onClick={() => this.handleAddProduct()}>Add a Product</button>
                <div className="row mt-3 mb-3">
                    <input
                        className="form-control"
                        placeholder="search..."
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>

                <b>Showing products 1-{filtLength}</b>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filt.map((ele, index) => (
                            <tr key={index}>
                                <th scope="row">{ele.id}</th>
                                <td>{ele.name}</td>
                                <td>{ele.category}</td>
                                <td>{ele.price}</td>
                                <td>
                                    <a href="" className="text-decoration-none" onClick={() => this.handleEdit(ele.id)}>
                                        Edit
                                    </a>
                                    <a href="" className="text-decoration-none ms-4" onClick={() => this.handleDelete(ele.id)}>
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductsTable;
