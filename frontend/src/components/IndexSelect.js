import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

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
			<FormGroup controlId={this.props.label}>
				<ControlLabel>{this.props.label}</ControlLabel>
				<FormControl 
                    componentClass="select" 
                    defaultValue="0"
                    className="index-form-select"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}>
                    <option disabled value='0'>--Select a {this.props.label}--</option>
                    { options.map((option) => (<option value={option.id} key={Math.floor(Math.random() * Math.floor(10000))}>{option.team_name}</option>)) }
				</FormControl>
			</FormGroup>
        )
    }
}

