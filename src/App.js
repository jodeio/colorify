import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import FacebookProvider, { Like, ShareButton } from 'react-facebook';

var FontAwesome = require('react-fontawesome');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: "http://colorify.devjdg.com",
      theme: "dark",
      defaultBackgroundColor: "#1abc9c",
      backgroundColor: "#1abc9c",
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
    if(e.target.value.length <= 6){
      this.convertHexToRgb(e.target.value);
    }else{
      this.setState({
        backgroundColor: this.state.defaultBackgroundColor,
        theme: "dark"
      })
    }
  }

  handleRgbOnChange = (e) => {
    // Render rgb component
    this.setState({
      rgb: e.target.value
    })

    if(!this.convertRgbToHex(e.target.value)){
      this.setState({
        backgroundColor: this.state.defaultBackgroundColor,
        theme: "dark"
      })
    }
  }

  convertHexToRgb = (hex) => {
    hex = hex.replace(/#/g,'');
    
    // TODO: Convert to a reusable method
    var r = hex.length === 3 ? parseInt(hex.charAt(0) + hex.charAt(0), 16) : parseInt(hex.substring(0,2), 16);
    var g = hex.length === 3 ? parseInt(hex.charAt(1) + hex.charAt(1), 16) : parseInt(hex.substring(2,4), 16);
    var b = hex.length === 3 ? parseInt(hex.charAt(2) + hex.charAt(2), 16) : parseInt(hex.substring(4,6), 16);

    if(isNaN(r) || isNaN(g) || isNaN(b)) return;

    // Assign rgb equivalent
    var rgb = 'rgb('+r+','+g+','+b+')';

    this.setState({
      rgb: rgb,
      backgroundColor: rgb
    })

    this.checkLuminance((r + g + b) / 3);
  }

  convertRgbToHex = (rgb) => {
    rgb = rgb.replace(/[rgb[{()}]/g, '');
    rgb = rgb.split(',');

    // Validate extracted elements
    if(isNaN(parseInt(rgb[0])) || isNaN(parseInt(rgb[1])) || isNaN(parseInt(rgb[2]))) return false;

    // Assign the hex equivalent
    var hex = "#" + parseInt(rgb[0]).toString(16) + parseInt(rgb[1]).toString(16) + parseInt(rgb[2]).toString(16);

    this.setState({
      hex: hex,
      backgroundColor: hex
    })

    this.checkLuminance(parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2]));

    return true;
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
          <Label> Ex. rgb(241,196,15) or 241,196,15 </Label>
        </Converter>
        <Footer>
          <Credits> 
              Made with ❤ by <Link href="www.devjdg.com" target="_blank">jodeio </Link> 
              | Fork on <Link href="https://github.com/jodeio/colorify"><FontAwesome name='github'/> </Link>
          </Credits>
          <FacebookProvider appId="198261724238131">
            <Like href={this.state.url} colorScheme={this.state.theme} showFaces share />
          </FacebookProvider>
        </Footer>
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
  padding-bottom: 100px;
`

const Converter = styled.div`
  position: relative;
  width: 280px;
  margin: 0 auto;
  top: 35%;
`

const Hex = styled.input`

`

const RGB = styled.input`

`

const Label = styled.small`
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  text-align: left;
  padding-left: 20px;
`

const Credits = styled.h3`
  text-align: center;
  padding-bottom: 20px;
`

const Link = styled.a`
  text-decoration: underline wavy;
`

export default App;
