import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App= () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearch] = useState('');

  const fetchData = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  const countrySearch = searchCountry ? countries.filter(country => country.name.toLowerCase().includes(searchCountry)) : 0

  const conditional = (busca) => { if (busca.length > 1 && busca.length < 10){
    return busca.map(country => <li>{country.name}</li>)
  } else if (busca.length === 1){
    return busca.map(country =>
      <div>
      <h1>{country.name}</h1>
      <img src={country.flag} width='100px'/>
      <p>Native name: {country.nativeName}</p>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      </div>
    )
  } else if (busca.length > 10) {return 'Too many matches'} else if (busca === 0){return 'Enter a filter'}
}

  useEffect(fetchData,[])

  return (
    <div>
      <p>Search country:</p>
      <input value={searchCountry} onChange={handleSearch}></input>
      <ul>
        {conditional(countrySearch)}
      </ul>
    </div>
  )
}

export default App;
