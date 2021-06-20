import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch('https://static-react-demo-wnbhw.ondigitalocean.app/digitalocean-nodejs-demo')
      .then(response => response.text())
      .then(data => {
        setMessage(data);
      });
  });

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
