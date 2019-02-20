import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import './App.css';

class App extends Component {
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get("isAuthenticated");
    const isAdim = cookies.get("isAdmin");
    return (
      <BrowserRouter>
        <div>
          <Nav isAuthenticated={isAuthenticated} isAdmin={isAdmin}/>
          <Routes/>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
