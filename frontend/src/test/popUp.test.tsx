import {useRecoilValue, atom} from "recoil";
import {FC, useEffect} from "react";
import {act, cleanup, fireEvent, render, screen} from "@testing-library/react";
import {RecoilRoot} from 'recoil';
import React from "react"
import {pokemonTeam} from "../store";
import Popup from "../components/popup/Popup";
import Team from "../components/team/Team";
import {Pokemon} from "../utils/Pokemon";
import {MockedProvider} from "@apollo/client/testing";
import {ADD_RATING_BY_POKEMONID, GET_POKEMON_BY_ID} from "../queries";

export const RecoilObserver: FC<{ node: any, onChange: Function }> = (props) => {
    const value = useRecoilValue(props.node);
    useEffect(() => props.onChange(value), [props.onChange, value]);
    return null;
};


const mocks = [{
    request: {
        query: ADD_RATING_BY_POKEMONID,
        variables: {
            input: {
                id: 6,
                rating: 2.5,
            }
        }
    },
    result: {data: {response: true}},
},
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
    }, {
        request: {
            query: ADD_RATING_BY_POKEMONID,
            variables: {
                input: {
                    id: 6,
                    rating: 2,
                }
            }
        },
        result: {data: {response: true}},
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
    test('Be able to add team member', () => {
        let onChange = jest.fn();
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={testPokemon1}/>
            </RecoilRoot>
        );
        expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
        const addButton = doc.getByTestId("add_button")
        act(() => {
            fireEvent.click(addButton)
        })

        //Initial state + call when adding pokemon
        expect(onChange).toHaveBeenCalledTimes(2);

        //Check that pokemon is added to team
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]);

        //Button should be removed
        expect(addButton).not.toBeInTheDocument()
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
        let addButton = doc.getByTestId("add_button")
        act(() => {
            fireEvent.click(addButton)
        })
        // Initial state on render.
        expect(onChange).toHaveBeenCalledWith([]);
        //to have been called when rendering charizard
        expect(onChange).toHaveBeenCalledTimes(2);
        // Second state on render.
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]);


        input = testPokemon2
        doc.rerender( //render a team with a different pokemon as input
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>)

        addButton = doc.getByTestId("add_button")
        //click add button
        act(() => {
            fireEvent.click(addButton)
        })

        // Check if both pokemon are in team
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})
            , expect.objectContaining({name: "Blastoise"})])
        expect(onChange).toHaveBeenCalledTimes(3);
    },);

    test('Able to swap pokemon', () => {
        let onChange = jest.fn();
        let input = testPokemon1
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const addButton = doc.getByTestId("add_button")
        //adds first pokemon to team
        act(() => {
            fireEvent.click(addButton)
        })

        input = testPokemon2
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>)

        // Initial state on render.
        expect(onChange).toHaveBeenCalledWith([]);

        // Second state on render.
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]);
        const swapButton = doc.getByTestId("swap_button")
        //click swap button on component
        act(() => {
            fireEvent.click(swapButton)
        })
        // Charizard is swapped out, and blastoise is swapped in
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Blastoise"})]);
        expect(onChange).toHaveBeenCalledTimes(3);
    });

    test('Be able to delete team members', () => {
        let onChange = jest.fn();
        let input = testPokemon1
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const addButton = doc.getByTestId("add_button")
        act(() => {
            fireEvent.click(addButton)
        })

        input = testPokemon2
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>)

        // Initial state on render.
        expect(onChange).toHaveBeenCalledWith([]);
        expect(onChange).toHaveBeenCalledTimes(2);
        // Second state on render.
        expect(onChange).toHaveBeenCalledWith([expect.objectContaining({name: "Charizard"})]);
        const removeButton = doc.getByTestId("remove_button")
        act(() => {
            fireEvent.click(removeButton)
        })
        expect(onChange).toHaveBeenCalledWith([]); // Charizard is removed
        expect(onChange).toHaveBeenCalledTimes(3);
    });
});


describe('Popup tests: ', () => {
    beforeEach(() => jest.resetAllMocks())

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
            setTimeout(resolve, 0)
        });

        const submit = doc.getByTestId("rating_submit")
        expect(submit).toBeDisabled()

        expect(doc.getByText("Stats")).toBeInTheDocument()
        expect(doc.getByText("Info")).toBeInTheDocument()
        expect(doc.getByText("Add pokemon to current team")).toBeInTheDocument()
        //should be capitalized
        expect(doc.getByText("Charizard")).toBeInTheDocument()
    });
/*
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
            setTimeout(resolve, 0)
        });
        const stars = doc.getAllByTestId("test_empty_star")
        for (let i = 0; i < stars.length; i++) { //checks one can click all stars, and render correctly
            if (i !== 0) { //will not find any, and fail
                expect(doc.getAllByTestId("test_full_star").length).toEqual(i)
            }
            act(() => {
                fireEvent.click(stars[i])
            })
            expect(doc.getAllByTestId("test_full_star").length).toEqual(i + 1)
        }

    });

    test('Can send rating of pokemon', async () => {
        let setOpen = jest.fn();
        const doc = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <Popup pokemonId={6} setOpen={setOpen}/>
                </RecoilRoot>
            </MockedProvider>
        );

        await new Promise(resolve => {
            setTimeout(resolve, 0)
        });
        const stars = doc.getAllByTestId("test_empty_star")
        const submit = doc.getByTestId("rating_submit")
        //button is disabled before rating is selected
        expect(submit).toBeDisabled()
        fireEvent.click(stars[4])
        //button is enabled after rating is selected
        expect(submit).toBeEnabled()
        fireEvent.click(submit)

        //button is disabled after rating is sent in
        expect(submit).toBeDisabled()

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
            setTimeout(resolve, 0)
        });

        expect(setOpen).toHaveBeenCalledTimes(0)
        const close = doc.getByTestId("close_popup")
        act(() => {
            fireEvent.click(close)
        })
        //check that method has been called. When setOpen=null, the popup is closed.
        expect(setOpen).toHaveBeenCalledTimes(1)
        expect(setOpen).toHaveBeenCalledWith(null)
    });*/
});