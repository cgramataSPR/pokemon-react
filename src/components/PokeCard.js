import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css" 
import { useEffect, useReducer } from 'react'

import ComponentIsLoading from "./ComponentIsLoading";
import StylingService from "../service/stylingService";

const PokeCard = ({ getPokemonModalData, pokemonSearchUrl }) => {

    const pokeCardInitialState = {
        pokemonId: '',
        pokemonImg: '',
        pokemonData: {},
        isLoading: true
    }

    //Todo: in here render a loading, wrap axios calls with a timer
    const pokeCardReducer = (state, action) => {
        switch (action.type) {
            case 'initialLoad':
                return{
                    pokemonId: action.pokemonId,
                    pokemonImg: action.pokemonImg,
                    pokemonData: action.pokemonData,
                    isLoading: action.isLoading
                }
            default:
                return{
                    pokemonId: '',
                    pokemonImg: '',
                    pokemonData: {},
                    isLoading: true
                }
        }
    }

    const [pokeCardState, pokeCardDispatch] = useReducer(pokeCardReducer, pokeCardInitialState);

    useEffect(() => {
        setData();
      }, []);

    const setData = async() => {
        await axios.get(pokemonSearchUrl)
        .then((response) => {
            const pokemonData = response.data
            pokeCardDispatch({
                type:'initialLoad',
                pokemonId: StylingService.prefixZeroesInId(pokemonData.id),
                pokemonImg: pokemonData.sprites.front_default,
                pokemonData: pokemonData,
                isLoading: false
            })
            console.log(pokemonData.id)
        })
        .catch(error => console.log(`Error: ${error}`))
    }

    if (pokeCardState.isLoading) {
        return (
            <ComponentIsLoading/>
        )
    }
    return (
        <div className="item centered-text">
            <div onClick={() => getPokemonModalData(pokemonSearchUrl)} style={{cursor: "pointer"}}>
                <p className="capitalize pokemon-card-name ">{pokeCardState.pokemonData.name}</p>
                <img className="image-container" src={pokeCardState.pokemonImg} alt="Pic not available..."/>
                <p>#{pokeCardState.pokemonId}</p>
            </div>
        </div>
    )
}

export default PokeCard
