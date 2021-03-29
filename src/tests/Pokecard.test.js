import React from "react";
import axios from 'axios'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PokeCard from "../components/PokeCard";

import { getQueriesForElement } from "@testing-library/react"

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders general Pokemon data', async () => {
    const fakePokemonData = {
        id: 1,
        name: "bulbasaur",
        sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        }
    };

    const expectedPokemonDataRendered = {
        id: "001",
        name: "Bulbasaur",
        sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        }
    }

    // const getSpySuccess = jest.spyOn(axios, 'get').mockImplementation(() =>
    //     Promise.resolve({
    //         json: () => Promise.resolve(fakePokemonData)
    //     })
    // );

    jest.spyOn(axios, 'get').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakePokemonData)
        })
    );

    await act(async () => {
        render(<PokeCard pokemonSearchUrl={'https://pokeapi.co/api/v2/pokemon/1'}/>, container)
    })

    const { getByText } = getQueriesForElement(container);

    getByText("Loading...")
    // expect(getSpySuccess).toHaveBeenCalled(1);
    // getByText(expectedPokemonDataRendered.id)
});