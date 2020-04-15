import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [deck, setDeck] = useState([]);
  console.log("REACT STATE DECK: ", deck)

  useEffect(() => {  
    let myDeck = []

    const myFunction = async () =>
    await (await fetch('/.netlify/functions/my-function/my-function.js')).json();

    console.log(myFunction);

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>blah blah blah</div>
        {deck.map((card) => <div>{JSON.stringify(card.fields)}</div>)}
      </header>
    </div>
  );
}

export default App;
