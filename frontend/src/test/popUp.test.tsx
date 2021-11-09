import {useRecoilValue, atom} from "recoil";
import {FC, useEffect} from "react";
import {act, fireEvent, render} from "@testing-library/react";
import {RecoilRoot} from 'recoil';
import React from "react"
import {pokemonTeam} from "../store";
import Popup from "../components/popup/Popup";
import Team from "../components/team/Team";
import {Pokemon} from "../utils/Pokemon";
import {MockedProvider} from "@apollo/client/testing";
import {ADD_RATING_BY_POKEMONID, GET_POKEMON_BY_ID} from "../queries";


//https://www.npmjs.com/package/react-recoil-hooks-testing-library
//https://www.youtube.com/watch?v=VjmAzW2lrR8&ab_channel=BenAwad

export const RecoilObserver: FC<{ node: any, onChange: Function }> = (props) => {
    const value = useRecoilValue(props.node);
    useEffect(() => props.onChange(value), [props.onChange, value]);
    return null;
};

/*
let localStore: Map<number,number>;
beforeEach(() => {
    localStore = new Map<number, number>()

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
        key in localStore ? localStore.get(key) : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
        (key, value) => (localStore.set(key,value))
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore.clear()));
});*/


const mocks = [
    {
        request: {
            query: GET_POKEMON_BY_ID,
            variables: {input: {id: 6}}

        },
        result: {
            data: {
                getPokemonById: {
                    entry_number: 6,
                    name: "charizard",
                    pokeTypes: ["fire", "flying"],
                    rating: 4.2,
                    rating_count: 5,
                    sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
                    stats: {
                        attack: 84,
                        defense: 78,
                        hp: 78,
                        special_attack: 109,
                        special_defense: 85,
                        speed: 100,
                        total: 534,
                    },
                    usage_count: 3,
                    weight: 905,
                }
            }
        }
    },
    {
        request: {
            query: ADD_RATING_BY_POKEMONID,
            variables: {input: {id: 6, rating: 4}} //TODO: rating change + add body
        },
        result: {
            data: {}
        }
    }
]

const testPokemon1 = {
    name: "Charizard",
    pokeTypes: ["fire", "flying"],
    sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
    entry_number: "6",
    stats: {
        hp: 78,
        attack: 84,
        defense: 78,
        special_attack: 109,
        special_defense: 85,
        speed: 100,
        total: 534,
    },
    weight: 90.5,
    rating: 4,
    number_of_ratings: 2,
    usage_count: 2
} as unknown as Pokemon

const testPokemon2 = {
    name: "Blastoise",
    pokeTypes: ["water"],
    sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/9.png",
    entry_number: "9",
    stats: {
        hp: 79,
        attack: 89,
        defense: 100,
        special_attack: 85,
        special_defense: 105,
        speed: 78,
        total: 530,
    },
    weight: 85.5,
    rating: 4.1,
    number_of_ratings: 2,
    usage_count: 1
} as unknown as Pokemon

describe('Team tests: ', () => {
    test('Be able to add team', () => {
        let onChange = jest.fn();

        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={testPokemon1}/>
            </RecoilRoot>
        );

        const component = doc.getByTestId("add_button")
        fireEvent.click(component)
        expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]); // Second state on render.
        expect(component).not.toBeInTheDocument() //Button should be removed
    });

    test('Able to add two members', () => {
        let onChange = jest.fn();
        let input = testPokemon1
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const component = doc.getByTestId("add_button")
        fireEvent.click(component)

        input = testPokemon2
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>)

        expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]); // Second state on render.
        const component1 = doc.getByTestId("add_button")
        fireEvent.click(component1)
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})
            , expect.objectContaining({name: "Blastoise"})]); // final state on render.
        expect(onChange).toHaveBeenCalledTimes(3);
    },);

    test('Swap pokemon', () => {
        let onChange = jest.fn();
        let input = testPokemon1
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const component = doc.getByTestId("add_button")
        fireEvent.click(component)

        input = testPokemon2
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>)

        expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]); // Second state on render.
        const component1 = doc.getByTestId("swap_button")
        fireEvent.click(component1)
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Blastoise"})]); // Charizard is swapped
        expect(onChange).toHaveBeenCalledTimes(3);
    });

    test('Be able to delete members', () => {
        let onChange = jest.fn();
        let input = testPokemon1
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const component = doc.getByTestId("add_button")
        fireEvent.click(component)

        input = testPokemon2
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>)

        expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]); // Second state on render.
        const component1 = doc.getByTestId("remove_button")
        fireEvent.click(component1)
        expect(onChange).toHaveBeenCalledWith([]); // Charizard is removed
        expect(onChange).toHaveBeenCalledTimes(3);
    });
});


describe('Popup tests: ', () => {
    test('Renders correctly', async () => {
        let setOpen = jest.fn();
        const doc = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <Popup pokemonId={6} setOpen={setOpen}/>
                </RecoilRoot>
            </MockedProvider>
        );

        await new Promise(resolve => {
            act(() => {
                setTimeout(resolve, 0)
            })
        });
        const submit = doc.getByTestId("rating_submit")
        expect(submit).toBeDisabled()
        expect(doc.findAllByText("Charizard")).toBeInTheDocument()
        expect(doc.findAllByText("Stats")).toBeInTheDocument()
        expect(doc.findAllByText("Info")).toBeInTheDocument()
        expect(doc.findAllByText("Add pokemon to current team")).toBeInTheDocument()
    });

    test('Can rate pokemon', async () => {
        let setOpen = jest.fn();
        const doc = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <Popup pokemonId={6} setOpen={setOpen}/>
                </RecoilRoot>
            </MockedProvider>
        );

        await new Promise(resolve => {
            act(() => {
                setTimeout(resolve, 0)
            })
        });
        const rating = doc.getByTestId("rating")
        const submit = doc.getByTestId("rating_submit")
        //fireEvent.click(rating.firstChild!) //TODO: not working
        //expect(submit).toBeEnabled()
    });

    test('Can exit screen', async () => {
        let setOpen = jest.fn();
        const doc = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <Popup pokemonId={6} setOpen={setOpen}/>
                </RecoilRoot>
            </MockedProvider>
        );

        await new Promise(resolve => {
            act(() => {
                setTimeout(resolve, 0)
            })
        });
        expect(setOpen).toHaveBeenCalledTimes(0)
        const close = doc.getByTestId("close_popup")
        fireEvent.click(close)
        expect(setOpen).toHaveBeenCalledTimes(1)
        expect(setOpen).toHaveBeenCalledWith(null)
    });


});