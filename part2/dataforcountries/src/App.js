import axios from "axios"
import { useState, useEffect } from "react"
import Content from "./components/Content"

const App = () => {
  const [value, setValue] = useState("")
  const [result, setResult] = useState([])

  useEffect(() => {
    if (value !== "") {
      axios.get("https://restcountries.com/v3.1/all").then((res) => {
        const temp = res.data.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )
        setResult(temp)
      })
    }
  }, [value])

  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      <Content result={result} setResult={setResult}/>
    </div>
  )
}
export default App
