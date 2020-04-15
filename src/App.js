import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [deck, setDeck] = useState([]);
  console.log("REACT STATE DECK: ", deck)

  const getCards = async () => {
    const url = `/.netlify/functions/airtable-list/airtable-list`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() => {   
    getCards().then((result) => setDeck(result))
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
        {deck.map((card) => <div key={card.id}>{JSON.stringify(card.fields)}</div>)}
      </header>
    </div>
  );
}

export default App;
