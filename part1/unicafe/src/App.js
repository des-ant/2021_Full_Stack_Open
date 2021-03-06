import React, { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const StatisticLine = ({text, value, isPercentage}) => (
  <tr>
    <td>{text}</td>
    <td>{ isNaN(value) ? 0 : value} { isPercentage ? '%' : '' }</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return (
      <div>
        No feeback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} isPercentage={true} />
        </tbody>
      </table>
    </div>
  )
};

const App = (props) => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Variables to calculate statistics
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  // Functions to update state
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
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
};

export default App;