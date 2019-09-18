import React, { Component } from 'react';
import Getpic from './components/Get_pic'


const ServerUrl = ''

class App extends Component {
  render() {
    return (
        <Getpic ServerUrl = {ServerUrl}/>
    );
  }
}

export default App;
