import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Airtable from 'airtable';

function App() {

  const [deck, setDeck] = useState([]);
  console.log("REACT STATE DECK: ", deck)

  useEffect(() => {
    // airtable
    const base = new Airtable({ apiKey: 'XXXXXXXXX' }).base('appr7aUJe07RDR9Ho');
    
    let myDeck = []

    base('Card').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 10,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
        myDeck.push(record)
        console.log('Retrieved', record);
      });
  
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
    }, function done(err) {
      if (err) { console.error(err); return; }

      console.log(myDeck);
      setDeck(myDeck);
    });

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
