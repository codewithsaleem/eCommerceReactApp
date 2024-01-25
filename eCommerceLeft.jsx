import React, { Component } from "react";

class Left extends Component {
    state = {};

    handleChange = (selectedCategory) => {
        let options = { ...this.props.options };
        options.category = selectedCategory;
        this.props.onOptionChange(options);
    };
    
    render() {
        const { category = "" } = this.props.options;
        const allCategories = ["All", "Sunglasses", "Watches", "Belts", "Handbags", "Wallets", "Formal Shoes", "Sport Shoes", "Floaters", "Sandals"];

        return (
            <div className="container">
                {allCategories.map((ele, index) => (
                    <div
                        key={index}
                        className={`row border p-2 ${category === ele ? "selected" : ""}`}
                        style={{ backgroundColor: "white" }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "silver")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                        onClick={() => this.handleChange(ele)}
                    >
                        <label>
                            <a
                                href=""
                                className="link-dark"
                                style={{ textDecoration: "none" }}
                            >
                                {ele}
                            </a>
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

export default Left;
