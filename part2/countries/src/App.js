import { useEffect, useState } from "react";
import countryService from "./services/countries";

const Result = ({ result, query }) => {

  if (result.length > 10 && query) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (result.length > 1 && query) {
    return <Countries result={result} />
  }
  else if (result.length == 1) {
    return <Details result={result}></Details>
  }

}

const Countries = ({ result }) => {
  const [clicked, setClicked] = useState(false);
  const [countryName, setCountryName] = useState("")

  const countriesToShow = clicked ? result.filter(country => {
    return (
      country.name.common === countryName
    )
  }
  ) : result

  const handleOnClick = (country) => {
    setClicked(true)
    setCountryName(country)
  }

  if (!clicked) {
    return (
      <>
        {result.map(country => {
          return (
            <p key={country.name.common}>{country.name.common}
              <button onClick={() => handleOnClick(country.name.common)}>show</button>
            </p>
          )
        })}
      </>
    )
  }
  else {
    return (
      <Details result={countriesToShow} />
    )
  }
}

const Details = ({ result }) => {
  const renderObjectProperties = (obj) => {
    const propertyList = [];

    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        const value = obj[property];
        propertyList.push(
          <li key={property}>
            {value}
          </li>
        );
      }
    }

    return propertyList;
  };

  return (
    <>
      {result.map(country => {
        return (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>
              capital {country.capital} <br />
              area {country.area} <br />
            </p>
            <b>languages:</b>
            <ul>
              {renderObjectProperties(country.languages)}
            </ul>
            <img src={country.flags.png} alt="Image unavailable!" />
          </div>

        )
      })}
    </>
  )
}
  
const Weather = () => {
  return(
    <>
    <h1>Weather in </h1>
    <p>temperature Celcius wind m/s</p>
    </>
  )
}

const App = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([])
  const [weather, setWeather] = useState([])

  const handleOnChange = (event) => {
    setQuery(event.target.value)
  }

  const filterdByRegion = (array) => {
    return array.filter(el => el.name.common.toLowerCase().includes(query))
  }

  useEffect(() => {
    countryService.getAll().then(initialCountries => {
      setResult(initialCountries)
    })
  }, [])

  return (
    <div>
      <p>find countries <input value={query} onChange={handleOnChange} /></p>
      <Result result={filterdByRegion(result)} query={query} />
    </div>
  )
}

export default App;
