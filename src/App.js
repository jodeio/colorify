import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      theme: "light",
      defaultBackgroundColor: "#F1C40F",
      backgroundColor: "#F1C40F",
      hex: "",
      rgb: "",
    }
  }

  handleHexOnChange = (e) => {
    // Render hex component
    this.setState({
      hex: e.target.value
    })

    // TODO: Add stubs here to support 8 digit hex
    if(e.target.value.length === 3 || e.target.value.length === 6){
      this.convertHexToRgb(e.target.value);
    }else{
      this.setState({
        backgroundColor: this.state.defaultBackgroundColor,
        theme: "light"
      })
    }
  }

  handleRgbOnChange = (e) => {
    // Render rgb component
    this.setState({
      rgb: e.target.value
    })
  }

  convertHexToRgb = (hex) =>{
    hex = hex.replace(/#/g,'');
    
    // TODO: Convert to a reusable method
    var r = hex.length === 3 ? parseInt(hex.charAt(0) + hex.charAt(0), 16) : parseInt(hex.substring(0,2), 16);
    var g = hex.length === 3 ? parseInt(hex.charAt(1) + hex.charAt(1), 16) : parseInt(hex.substring(2,4), 16);
    var b = hex.length === 3 ? parseInt(hex.charAt(2) + hex.charAt(2), 16) : parseInt(hex.substring(4,6), 16);

    if(isNaN(r) || isNaN(g) || isNaN(b)) return;

    // Assign rgb equivalent
    var result = 'rgb('+r+','+g+','+b+')';

    this.setState({
      rgb: result,
      backgroundColor: result
    })

    // Check luminance
    this.checkLuminance((r + g + b) / 3);

  }

  checkLuminance = (lum) => {
    if(lum < 128){
      this.setState({
        theme: "dark"
      })
    }else{
      this.setState({
        theme: "light"
      })
    }
  }
  
  componentDidMount(){
    // TODO: Add stubs here for initial background randomization
  }
  
  render() {
    return (
      <Main className={this.state.theme} style={{background: this.state.backgroundColor}}>
        <Converter>
          <Hex id="hex" placeholder="hex" autocomplete="off" onChange={this.handleHexOnChange} value={this.state.hex}>
          </Hex>
          <Label> Ex. #f1c40f or f1c40f </Label>
          <RGB id="rgb" placeholder="rgb" autocomplete="off" onChange={this.handleRgbOnChange} value={this.state.rgb}>
          </RGB>
          <Label> Ex. rgb(241,196,15) </Label>
        </Converter>
      </Main>
    );
  }
}

const Main = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  text-align:center;
`

const Converter = styled.div`
  position: relative;
  width: 280px;
  margin: 0 auto;
  top: 30%;
`

const Hex = styled.input`

`

const RGB = styled.input`

`

const Label = styled.small`
`

export default App;
