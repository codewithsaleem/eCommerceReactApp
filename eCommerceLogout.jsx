import React, {Component} from "react";
import auth from "./httpServiceEcommerceAuth.js";
class Logout extends Component {
    componentDidMount () {
        auth.logout();
        this.props.history.push("/login");
    }

    render () {
        return ""
    }
}
export default Logout;