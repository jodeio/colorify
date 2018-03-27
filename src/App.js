import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      theme: "light",
      defaultBackgroundColor: "#F1C40F",
      backgroundColor: "#F1C40F"
    }
  }

  handleKeyPress = (e) => {
    // TODO: Add stubs here to support 8 digit hex
    if(e.target.value.length === 3 || e.target.value.length === 6){
      this.convertHex(e.target.value);
    }else{
      this.setState({
        backgroundColor: this.state.defaultBackgroundColor,
        theme: "light"
      })
    }
  }

  convertHex = (hex) =>{
    hex = hex.replace(/#/g,'');
    
    // TODO: Convert to a reusable method
    var r = hex.length === 3 ? parseInt(hex.charAt(0) + hex.charAt(0), 16) : parseInt(hex.substring(0,2), 16);
    var g = hex.length === 3 ? parseInt(hex.charAt(1) + hex.charAt(1), 16) : parseInt(hex.substring(2,4), 16);
    var b = hex.length === 3 ? parseInt(hex.charAt(2) + hex.charAt(2), 16) : parseInt(hex.substring(4,6), 16);

    // Assign rgb equivalent
    var result = 'rgb('+r+','+g+','+b+')';
 
    this.setState({
      backgroundColor: result
    })

    // Check luminance
    var lum = (r + g + b) / 3;

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
        <Hex id="hex" placeholder="hex" autocomplete="off" onKeyUp={this.handleKeyPress}>
        </Hex>
        <RGB id="rgb" placeholder="rgb" autocomplete="off" onKeyUp={this.handleKeyPress}>
        </RGB>
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
`

const Hex = styled.input`

`

const RGB = styled.input`

`

export default App;
