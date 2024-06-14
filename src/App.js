import React from 'react';
import './App.css';
import Quiz from './components/Quiz';
import logo from './pics/ikonka.png'; 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
        <h1>YAMR movie recommendation App</h1>
        <Quiz />
      </header>
    </div>
  );
}

export default App;
