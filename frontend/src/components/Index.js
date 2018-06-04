import React, { Component } from "react";
import ReactDOM from "react-dom";

class Index extends Component {
    componentWillMount(){
        fetch("/api/teams")
            .then(response => {
                console.log(response)
            })
    }

    render(){
        return (
            <p>Hello World</p>
        )
    }
}

var wrapper = document.getElementById("index-page")
wrapper ? ReactDOM.render(<Index />, wrapper) : null;
