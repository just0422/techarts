import React, { Component } from 'react';
import { Panel, Row, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import "../../stylesheets/generic.css";
import "../../stylesheets/fixture.css";

export default class Fixture extends Component {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
        this.closePanel = this.closePanel.bind(this);
        this.openPanel = this.openPanel.bind(this); 

        this.state = {
            open: false
        }
    }

    handleChange(){
        // Pass value back up the chain
        this.props.toggleWorking(this.props.id, !this.props.working);
    }

    closePanel(){
        let reason = "";
        if (this.reason != null)
            reason = this.reason.value;
        this.props.saveWorking(this.props.id, this.props.working, reason) 
        this.setState({ 
            open: false
        })
    }

    openPanel(){
        this.setState({
            open: true
        })
    }

    render() {
        let style = this.props.working ? "success" : "danger";
        return (
            <Panel eventKey={this.props.id} bsStyle={style} defaultExpanded={this.state.open}>
                <Panel.Heading onClick={this.openPanel}>
                    <Panel.Title>{this.props.name}</Panel.Title>
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
                                <FormControl componentClass="textarea" defaultValue={this.props.reason} inputRef={ ref => { this.reason = ref; }} />
                            </FormGroup>
                        </Row>
                    }
                    <Row>
                        <Col xs={12}>
                            <Button bsStyle="primary" block className="working-fixtures-save-button" onClick={this.closePanel}>Save</Button>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        )
    }
}
