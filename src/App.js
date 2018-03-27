import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      backgroundColor: ""
    }
  }

  handleKeyPress = (e) => {
    this.convertHex(e.target.value);
  }

  convertHex = (hex) =>{
    hex = hex.replace(/#/g,'');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);

    var result = 'rgb('+r+','+g+','+b+')';
 
    this.setState({
      backgroundColor: result
    })
  }
  
  componentDidMount(){
    // TODO: Add stubs here for initial background randomization
    this.setState({
      backgroundColor: "#F2F"
    })
  }
  
  render() {
    return (
      <Main className="wrap" style={{background: this.state.backgroundColor}}>
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
