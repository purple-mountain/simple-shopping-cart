import * as React from 'react';
import './App.css';

function Counter() {
  const counters = [
    {id: 1, counter: 'Zero'},
    {id: 2, counter: 'Zero'},
    {id: 3, counter: 'Zero'},
    {id: 4, counter: 'Zero'},
  ]

  const [individualCounters, setIndividualCounter] = React.useState(counters)
  
  const generalCounter = calcGeneralCounter(individualCounters);

  function partialReset() {
    const individualCountersCopy = [...individualCounters];
    individualCountersCopy.forEach(item => {
      item.counter = 'Zero';
    })
    setIndividualCounter(individualCountersCopy)
  }

  function completeReset() {
    setIndividualCounter(counters)
  }

  function addItem(i) {
    const individualCountersCopy = [...individualCounters];
    individualCountersCopy[i].counter = 
      typeof individualCountersCopy[i].counter === 'string'
      ? 1
      : individualCountersCopy[i].counter + 1;
    setIndividualCounter(individualCountersCopy);
  }

  function removeItem(i) {
    const individualCountersCopy = [...individualCounters];
    individualCountersCopy[i].counter = 
      individualCountersCopy[i].counter === 1
      ? 'Zero'
      : individualCountersCopy[i].counter - 1;
    setIndividualCounter(individualCountersCopy);
  }

  function deleteItemRow(i) {
    setIndividualCounter(individualCounters.filter(item => item.id !== individualCounters[i].id));
  }

  return (  
  <div>
    <div>
      <div>
        {generalCounter}
      </div>
      <div>
        <button onClick={partialReset} disabled={individualCounters.length === 0}>Partial Reset</button>
        <button onClick={completeReset} disabled={individualCounters.length !== 0}>Complete Reset</button>
      </div>
      <div>
        {individualCounters.map((individualCounter, i) => (
          <div key={individualCounter.id}>
            <span>{individualCounter.counter}</span>
            <button onClick={() => addItem(i)}>+</button>
            <button onClick={() => removeItem(i)} disabled={individualCounter.counter === 'Zero'}>-</button>
            <button onClick={() => deleteItemRow(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

function calcGeneralCounter(individualCounters) {
  if(individualCounters.length === 0) return 0;

  return individualCounters.map(item => (
    item.counter === 'Zero' ? 0 : 1
  )).reduce((acc, curr) => acc + curr);
}

function App() {
  return (
    <main>
      <Counter></Counter>
    </main>
  );
}

export default App;



/*
Notes for 16.02.23
Complete reset should be clickable only when there are no itemsRows left
Should learn git first

Later for css:
There should be focus on the last clicked button (outline/border)
Border of the container decreases when the elements are deleted


*/