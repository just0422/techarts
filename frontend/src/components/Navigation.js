import React from "react";
import ReactDOM from "react-dom";


class Navigation extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    }

    state = {
        data: [],
        loaded: false
    };

    render() {
        const { data, loaded } = this.state;
        return loaded ? this.props.render(data) : '';
    }

    componentDidMount() {
        fetch(this.props.endpoint)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({ data: data, loaded: true }));
    }
}
