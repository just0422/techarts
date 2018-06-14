import React, { Component } from 'react';

import "../stylesheets/section.css";

export default class Section extends Component {
    render(){
        return (
            <div className="section">
                <div className="section-title">
                    <h2>{this.props.section.section_name}</h2>
                </div>
            </div>
        )
    }
}
