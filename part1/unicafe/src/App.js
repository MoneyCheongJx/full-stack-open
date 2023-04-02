import { useState } from 'react'

const Heading = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>
    {text}
  </button>


const StatisticsLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = () => {
    return (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
  }

  const calculatePositive = () => {
    if (good + neutral + bad === 0)
      return 0
    return (good / (good + neutral + bad) * 100)
  }

  if (good + neutral + bad === 0)
    return <p>No feedback given</p>

  return (
    <div>
      <h1>statistics</h1>
      <table>

        {/* <thead>
         <tr>
          <th>statistics</th>
         </tr>
        </thead> */}

        <tbody>
          <tr>
            <td> <StatisticsLine text="good" value={good} /> </td>
          </tr>
          <tr>
            <td> <StatisticsLine text="neutral" value={neutral} /> </td>
          </tr>
          <tr>
            <td> <StatisticsLine text="bad" value={bad} /> </td>
          </tr>
          <tr>
            <td>  <StatisticsLine text="all" value={good + neutral + bad} /> </td>
          </tr>
          <tr>
            <td> <StatisticsLine text="average" value={calculateAverage()} /> </td>
          </tr>
          <tr>
            <td> <StatisticsLine text="average" value={calculatePositive() + "%"} /> </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('increasing good, before', good);
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    console.log('increasing neutral, before', neutral);
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    console.log('increasing bad, before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Heading text='give feedback' />
      <Button
        handleClick={increaseGood}
        text='good'
      />

      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />

      <Button
        handleClick={increaseBad}
        text='bad'
      />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App;
