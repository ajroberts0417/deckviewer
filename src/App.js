import React, {useEffect, useState} from 'react';
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
      <p className="label">All Cards:</p>
      {deck.map((card) => <div key={card.id}>{JSON.stringify(card.fields)}</div>)}
    </div>
  );
}

export default App;
