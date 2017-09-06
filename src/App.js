import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <p className="App-intro">
          Login Form<br/>
          <input type="text" name="uname" placeholder="username" /><br/>
          <input type="password" name="pwd" placeholder="password" /><br/>
          <input type="submit" value="login" />
        </p>
      </div>
    );
  }
}

export default App;
