import React, { useState } from 'react'

const Anecdote = ({anecdote, votes}) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
);

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  // Save selected anecdote to its own state
  const [selected, setSelected] = useState(0);
  // Store votes of each anecdote in array, initially zero filled
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  // Generate random int
  const getRandomInt = (max) => Math.floor(Math.random() * max);
  // Choose random anecdote
  const getRandomAnecdote = () => setSelected(getRandomInt(anecdotes.length));

  // Update number of votes for a given anecdote
  const voteAnecdote = (points, selected) => {
    // Copy array of votes to avoid mutation
    const copy = [...points];
    // Increment the value in position of selected anecdote by one
    copy[selected] += 1;
    // Update votes state with udpated array
    setPoints(copy);
  };

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={() => voteAnecdote(points, selected)} text='vote' />
      <Button onClick={getRandomAnecdote} text='next anecdote' />
    </div>
  )
}

export default App