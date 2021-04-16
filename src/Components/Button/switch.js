import React, { Component } from "react";
import Switch from "react-switch";

class SwitchButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
     
      
        <Switch 
        onChange={this.handleChange} 
        className="toggler-button" 
        checked={this.state.checked}
        offColor={"#FF6347"} />
    
    );
  }
}

export default SwitchButton;