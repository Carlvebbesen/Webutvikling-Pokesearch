import {useRecoilValue} from "recoil";
import {FC, useEffect} from "react";
import {act, fireEvent, render} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import React from "react";
import {pokemonTeam} from "../store";
import Popup from "../components/popup/Popup";
import Team from "../components/team/Team";
import {MockedProvider} from "@apollo/client/testing";
import {mocks, testPokemon1, testPokemon2} from "./testData";
import {waitForRender} from "./overviewPage.test";

export const RecoilObserver: FC<{ node: any; onChange: Function }> = (
    props
) => {
    const value = useRecoilValue(props.node);
    useEffect(() => props.onChange(value), [props.onChange, value]);
    return null;
};
describe("Team tests:", () => {
    test("Can add team member", () => {
        let onChange = jest.fn();
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={testPokemon1}/>
            </RecoilRoot>
        );
        expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
        const addButton = doc.getByTestId("add_button");
        act(() => {
            fireEvent.click(addButton);
        });

        //Initial state + call when adding pokemon
        expect(onChange).toHaveBeenCalledTimes(2);

        //Check that pokemon is added to team
        expect(onChange).toHaveBeenCalledWith([
            expect.objectContaining({name: "Charizard"}),
        ]);

        //Button should be removed
        expect(addButton).not.toBeInTheDocument();
    });

    test("Can add two members", () => {
        let onChange = jest.fn();
        let input = testPokemon1;
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        let addButton = doc.getByTestId("add_button");
        act(() => {
            fireEvent.click(addButton);
        });
        // Initial state on render.
        expect(onChange).toHaveBeenCalledWith([]);
        //to have been called when rendering charizard
        expect(onChange).toHaveBeenCalledTimes(2);
        // Second state on render.
        expect(onChange).toHaveBeenCalledWith([
            expect.objectContaining({name: "Charizard"}),
        ]);

        input = testPokemon2;
        doc.rerender(
            //render a team with a different pokemon as input
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );

        addButton = doc.getByTestId("add_button");
        //click add button
        act(() => {
            fireEvent.click(addButton);
        });

        // Check if both pokemon are in team
        expect(onChange).toHaveBeenCalledWith([
            expect.objectContaining({name: "Charizard"}),
            expect.objectContaining({name: "Blastoise"}),
        ]);
        expect(onChange).toHaveBeenCalledTimes(3);
    });

    test("Can swap two pokemons", () => {
        let onChange = jest.fn();
        let input = testPokemon1;
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const addButton = doc.getByTestId("add_button");
        //adds first pokemon to team
        act(() => {
            fireEvent.click(addButton);
        });

        input = testPokemon2;
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );

        // Initial state on render.
        expect(onChange).toHaveBeenCalledWith([]);

        // Second state on render.
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([
            expect.objectContaining({name: "Charizard"}),
        ]);
        const swapButton = doc.getByTestId("swap_button");
        //click swap button on component
        act(() => {
            fireEvent.click(swapButton);
        });
        // Charizard is swapped out, and blastoise is swapped in
        expect(onChange).toHaveBeenCalledWith([
            expect.objectContaining({name: "Blastoise"}),
        ]);
        expect(onChange).toHaveBeenCalledTimes(3);
    });

    test("Is able to delete members", () => {
        let onChange = jest.fn();
        let input = testPokemon1;
        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );
        const component = doc.getByTestId("add_button");
        fireEvent.click(component);

        input = testPokemon2;
        doc.rerender(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
                <Team currentPokemon={input}/>
            </RecoilRoot>
        );

        // Initial state on render.
        expect(onChange).toHaveBeenCalledWith([]);
        expect(onChange).toHaveBeenCalledTimes(2);
        // Second state on render.
        expect(onChange).toHaveBeenCalledWith([
            expect.objectContaining({name: "Charizard"}),
        ]);
        const removeButton = doc.getByTestId("remove_button");
        act(() => {
            fireEvent.click(removeButton);
        });
        expect(onChange).toHaveBeenCalledWith([]); // Charizard is removed
        expect(onChange).toHaveBeenCalledTimes(3);
    });
});

describe("Popup tests:", () => {
    //avoid tests interfering with each other
    beforeEach(() => jest.resetAllMocks());

    test("Renders correctly", async () => {
        let setOpen = jest.fn();
        const doc = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <Popup pokemonId={6} setOpen={setOpen}/>
                </RecoilRoot>
            </MockedProvider>
        );
        await act(async () => {
            await waitForRender();
        });

        const submit = doc.getByTestId("rating_submit");
        expect(submit).toBeDisabled();

        expect(doc.getByText("Stats")).toBeInTheDocument();
        expect(doc.getByText("Info")).toBeInTheDocument();
        expect(doc.getByText("Add pokemon to current team")).toBeInTheDocument();
        //should be capitalized
        expect(doc.getByText("Charizard")).toBeInTheDocument();
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
        await act(async () => {
            await waitForRender();
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
        await act(async () => {
            await waitForRender();
        });
        const stars = doc.getAllByTestId("test_empty_star")
        const submit = doc.getByTestId("rating_submit")
        //button is disabled before rating is selected
        expect(submit).toBeDisabled()
        fireEvent.click(stars[5])
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

        await act(async () => {
            await waitForRender();
        });

        expect(setOpen).toHaveBeenCalledTimes(0)
        const close = doc.getByTestId("close_popup")
        act(() => {
            fireEvent.click(close)
        })
        //check that method has been called. When setOpen=null, the popup is closed.
        expect(setOpen).toHaveBeenCalledTimes(1)
        expect(setOpen).toHaveBeenCalledWith(null)
    });
});
