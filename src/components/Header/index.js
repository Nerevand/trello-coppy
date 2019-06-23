import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import logo from '../../assets/svg/logo.svg';

import './style.css';

class App extends Component {
  render() {
    return (
      <header className="app-header">
        <NavLink to='/'>
          <img src={logo} className="app-logo" alt="" />
        </NavLink>
      </header>
    );
  }
}

export default App;
