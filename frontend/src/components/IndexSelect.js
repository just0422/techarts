import React, { Component } from "react";
import { Row, Input } from "react-materialize";

export default class IndexSelect extends Component {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
    }
    
    // Handle select changed by returning name to parent
    handleChange(e){
        if (this.props.campus)
            this.props.handleSelect(e);
        if(e.target.value === '0')
            this.props.setFieldValue(this.props.name, '')
        else
            this.props.setFieldValue(this.props.name, e.target.value)
    }
    
    // REnder select element
    render(){
        var options = []

        // Convert campus to match format of Teams for some DRY code
        if (this.props.campus)
            options = this.props.options.map((campus) => ({ id: campus, team_name: campus }))
        else
            options = this.props.options

        return (
            <Row>
                <Input s={12} type='select' name={this.props.name} label={this.props.label} onChange={this.handleChange} onBlur={this.props.handleBlur} defaultValue='0'>
                    <option disabled value='0'>--Select a {this.props.label}--</option>
                    { options.map((option) => (<option value={option.id} key={Math.floor(Math.random() * Math.floor(10000))}>{option.team_name}</option>)) }
                </Input>
            </Row>
        )
    }
}
