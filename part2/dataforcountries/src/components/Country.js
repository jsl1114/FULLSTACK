import { useEffect, useState } from "react"

const Country = ({ country }) => {
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
	const [weather, setWeather] = useState({})
	const [imgSrc, setImgSrc] = useState(``)

	useEffect(() => {

		const fetchData = async () => {
			const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`)
			res.json().then(json => {
				setWeather(json)
				setImgSrc(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
			})
		}
		// axios
		// 	.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`)
		// 	.then(res => {
		// 		const apiRes = res.data
		// 		setWeather(apiRes)
		// 		console.log(apiRes)
		// 		setImgSrc(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
		// 	})
		fetchData()
	}, [])


  return (
    <div className='singleCountry'>
      <h1>
        {country.name.common} {country.flag}
      </h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <>
        {Object.keys(country.languages).map((language, i) => {
          return <p key={i}>{country.languages[language]}</p>
        })}
      </>
      <img src={country.flags.png} alt={country.flags.alt} />
			{weather && (
				<div className='weather'>
        <h2>Weather in {country.name.common}</h2>
				<p>Tempreture: {weather?.main?.temp} &#8451;</p>
				<img src={imgSrc} alt="" />
				<p>Wind: {weather?.wind?.speed} m/s</p>
      </div>
			)}
    </div>
  )
}

// REACT_APP_OPENWEATHER_API_KEY = 9a7bbee8f57201de3d689ba9d0682cba
export default Country
