import React, { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const Display = ({text, counter}) => <p>{text} {counter}</p>;

const App = (props) => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + ' %';

  const incrementGoodCount = () => setGood(good + 1);
  const incrementNeutralCount = () => setNeutral(neutral + 1);
  const incrementBadCount = () => setBad(bad + 1);

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={incrementGoodCount} text='good' />
      <Button onClick={incrementNeutralCount} text='neutral' />
      <Button onClick={incrementBadCount} text='bad' />
      <Header title='statistics' />
      <div>
        <Display text='good' counter={good} />
        <Display text='neutral' counter={neutral} />
        <Display text='bad' counter={bad} />
        <Display text='all' counter={total} />
        <Display text='average' counter={average} />
        <Display text='positive' counter={positive} />
      </div>
    </div>
  )
};

export default App;