import React, { Component } from 'react';
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import "../../stylesheets/generic.css";
import "../../stylesheets/fixture.css";

export default class Fixture extends Component {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        // Pass value back up the chain
    }

    render() {
        let style = this.props.working ? "success" : "danger";
        return (
            <Panel eventKey={this.props.id} bsStyle={style}>
                <Panel.Heading>
                    <Panel.Title toggle>{this.props.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Row>
                        <Col xs={9} sm={7} md={5}>
                            <div className="working-fixtures-prompt">Is it working?</div>
                        </Col>
                        <Col xs={3} sm={5} md={7}>
                            <label className="switch">
                                <input type="checkbox" defaultChecked={this.props.working} onChange={this.handleChange}/>
                                <span className="slider round"></span>
                            </label>
                        </Col>
                    </Row>
                    { 
                        !this.props.working && 
                        <Row>
                            <FormGroup controlId="formControlsTextarea" className="working-fixtures-reason">
                                <ControlLabel>Reason:</ControlLabel>
                                <FormControl componentClass="textarea" />
                            </FormGroup>
                        </Row>
                    }
                </Panel.Body>
            </Panel>
        )
    }
}
