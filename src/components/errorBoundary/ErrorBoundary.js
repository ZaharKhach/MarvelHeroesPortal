import { Component } from "react";

import ErrorMassage from "../errorMassage/ErrorMassage";

class ErrorBoundary extends Component {

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);

        this.setState({
            error: true
        })
    }

    render() {
        const error = this.state;
        return error === true ? <ErrorMassage/> : this.props.children
    }
}
export default ErrorBoundary