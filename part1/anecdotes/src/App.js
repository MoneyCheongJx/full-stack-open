import { useState } from "react"

const Display = ({ heading, text, point}) => {
  return (
  <>
  <h1>{heading}</h1>
  <p>{text} <br/>
  has {point} votes</p>
  </>
  )
}

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>
    {text}
  </button>

const findTheMost = (points) => {
  let highest = 0;
  let index = 0;
  for (let i = 0; i < points.length; i++) {
    if (points[i] > highest) {
      highest = points[i]
      index = i;
    }
  }
  return index;
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleAnecdoteClick = () => {
    const randomNumber = Math.floor(Math.random() * 8)
    setSelected(randomNumber)
  }

  const handleVoteClick = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <Display heading="Anecdote of the day" text={anecdotes[selected]} point={points[selected]}/>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleAnecdoteClick} text="next anecdote" />
      <Display heading="Anecdote with most votes" text={anecdotes[findTheMost(points)]} point={points[findTheMost(points)]}/>
    </div>
  )
}


export default App;
