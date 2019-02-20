import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Nav/>
      <Routes/>
    </div>
  </BrowserRouter>
);

export default App;
