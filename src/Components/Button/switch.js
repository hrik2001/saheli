import React, { Component } from "react";
import Switch from "react-switch";
import {Redirect} from "react-router-dom";

class SwitchButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.state = {redirect:'sa'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    
  }


  render() {
      if(this.state.checked){
          return <Redirect to="/travelForm" />
      }

    return (
    
        <Switch 
        onChange={this.handleChange} 
        className="toggler-button" 
        checked={this.state.checked}
        offColor={"#F50057"} />
    
    );
  }
}

export default SwitchButton;