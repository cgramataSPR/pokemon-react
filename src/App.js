import axios from 'axios';
import { useState, useEffect } from 'react'
import GroupButton from './components/GroupButton'
import Pokemon from './components/Pokemon'

function App() {
  const [urlToSearch, setUrlToSearch] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [pokemonGroup, getPokemonGroup] = useState('')
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  useEffect(() => {
    getGeneralPokemon(urlToSearch);
  }, []);

  const checkNext = (url) => {
    if (url !== null) {
      setNextUrl(url)
      setHasNext(!hasNext)
    }
  }

  const checkPrev = (url) => {
    if (url !== null) {
      setPrevUrl(url)
      setHasPrev(!hasPrev)
    }
  }

  const getGeneralPokemon = async(url) => {
    await axios.get(url)
    .then((response) => {
        const pokemonData = response.data
        getPokemonGroup(pokemonData.results)
        checkNext(pokemonData.next)
        checkPrev(pokemonData.previous)
    })
    .catch(error => console.log(`Error: ${error}`))
  }

  const loadNewPokemonSet  = (url) => {
    getGeneralPokemon(url)
  }

  return (
    <div className="App">
      {hasPrev ? (<button className="btn" style={{ backgroundColor: "gray "}} onClick={loadNewPokemonSet(prevUrl)} >Prev</button>) : ''}
      {hasNext ? (<button className="btn" style={{ backgroundColor: "gray "}} onClick={loadNewPokemonSet(nextUrl)} >Next</button>) : ''}
      <Pokemon pokemonGroup={pokemonGroup}/>
    </div>
  );
}

export default App;
