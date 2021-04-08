import React from "react";
import axios from 'axios';
import PokeCard from "../components/PokeCard";

import { render, waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

let container = null;
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

describe("pokeCard", () => {
    it('fetches Pokemon data by given URL', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakePokemonData)
            })
        );

        render(<PokeCard pokemonSearchUrl={'https://pokeapi.co/api/v2/pokemon/1'}/>)

        await waitFor(() => {
            expect(axios.get).toBeCalledWith("https://pokeapi.co/api/v2/pokemon/1")
        });
    });

    it("renders fetched Pokemon data", async () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve({
               data: fakePokemonData
            })
        );

        render(<PokeCard pokemonSearchUrl={'https://pokeapi.co/api/v2/pokemon/1'}/>)

        expect(screen.getByText("Loading...")).toBeInTheDocument()
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
        })
        expect(screen.getByText(/001/)).toBeInTheDocument()
        expect(screen.getByText(/bulbasaur/)).toBeInTheDocument()
        screen.debug()
    });
})
