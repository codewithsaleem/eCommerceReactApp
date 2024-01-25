import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./eCommerceNavbar";
import Products from "./eCommerceAllProducts";
import Delete from "./eCommerceDeleteOrders";
import Cart from "./eCommerceCart";
import Register from "./eCommerceRegister";
import Login from "./eCommerceLogin";
import Summary from "./eCommerceSummaryofOreders";
import Thanks from "./eCommerceThanksPage";
import ListOrders from "./eCommerceListOrders";
import Logout from "./eCommerceLogout";
import ProductsTable from "./eCommerceProductsTable";
import DeleteProd from "./eCommerceDeleteProducts";
import Edit from "./eCommerceEditProducts";
import Watches from "./eCommerceWatches";
import Sunglasses from "./eCommerceSunglasses";
import Belts from "./eCommerceBelts";
import Handbags from "./eCommerceHandbags";
class MainComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />

                <div className="container">
                    <Switch>
                        <Route path="/products/:id/delete" component={DeleteProd} />
                        <Route path="/products/:id/edit" component={Edit} />
                        <Route path="/addNewProduct" component={Edit} />
                        <Route path="/orders/:id" component={Delete} />
                        <Route path="/watches" component={Watches} />
                        <Route path="/sunglasses" component={Sunglasses} />
                        <Route path="/belts" component={Belts} />
                        <Route path="/handbags" component={Handbags} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/Manage Products" component={ProductsTable} />
                        <Route path="/My Orders" component={ListOrders} />
                        <Route path="/thankYouPage" component={Thanks} />
                        <Route path="/summary" component={Summary} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/Logout" component={Logout} />

                        <Route path="/allProducts" component={Products} />
                        <Redirect from="/" to="/allProducts" />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}
export default MainComponent;