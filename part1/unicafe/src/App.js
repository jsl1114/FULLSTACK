import { useState } from "react"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>
  }

  const StatisticLine = ({ text, value }) => {
    return (
      <>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </>
    )
  }

  const Statistics = ({ good, neutral, bad }) => {
    if (good + neutral + bad === 0) {
      return (
        <div>
          <h1>Statistics</h1>
          No feedback given
        </div>
      )
    }
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine
              text='average'
              value={(good - bad) / (good + neutral + bad)}
            />
            <StatisticLine
              text='positive'
              value={`${100 * (good / (good + neutral + bad))}%`}
            />
            <StatisticLine
              text='Stars'
              value={(100 * (good / (good + neutral + bad))) / 20}
            />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}
export default App
