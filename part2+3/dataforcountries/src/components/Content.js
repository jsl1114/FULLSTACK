import Country from "./Country"

const Content = ({ result, setResult }) => {
  if (result.length > 10) {
    return (<p>Too many countries, specify another filter</p>)
  } else if (result.length > 2 && result.length <= 10) {
    return (
      <div className="namelist">
        {result.map((country, i) => (
          <pre key={i}>{country.name.common} <button onClick={() => setResult([country])} key={i}>show</button></pre>
        ))}
      </div>
    )
  } else if (result.length === 0) {
    return (
      <pre>null</pre>
    )
  } else {
    return (
      <Country country={result[0]}/>
    )
  }
}

export default Content
