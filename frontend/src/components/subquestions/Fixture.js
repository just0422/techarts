import React, { Component } from 'react';
import { Panel, Row, Col } from "react-bootstrap";

import "../../stylesheets/generic.css";

export default class Fixture extends Component {
    render() {
        return (
            <Panel eventKey={this.props.id}>
                <Panel.Heading>
                    <Panel.Title toggle>{this.props.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Row>
                        <Col sm={9}>
                            <p>Is it working?</p>
                        </Col>
                        <Col sm={3}>
                            <label className="switch">
                                <input type="checkbox" defaultChecked={this.props.working}/>
                                <span className="slider round"></span>
                            </label>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        )
    }
}
