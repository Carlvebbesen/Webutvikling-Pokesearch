import React from 'react'
import {RecoilRoot} from "recoil";
import MyTeamOverviewComponent from "../components/myTeamOverviewComponent/myTeamOverviewComponent"
import PokemonInTeamComponent from "../components/pokemonInTeamComponent/pokemonInTeamComponent"
import {act, fireEvent, render} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import Team from "../components/team/Team";
import userEvent from "@testing-library/user-event";
import {testPokemon1} from "./testData"
import {waitForRender} from "./overviewPage.test";


describe('Tests for myTeamOverviewComponent: ', () => {

    test('Test if myTeamOverviewComponent renders correctly without pokemon in team', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <MyTeamOverviewComponent />
                </RecoilRoot>
            </MockedProvider>
        );

        await act(async () => {
            await waitForRender();
        });

        const text1 : string = "You have not chosen any pokemon for your team. " +
            "Please go to Database and select some you like."
        const text2 : string = "Maybe you can get some inspiration from the teams below"

        //These strings should appear when there are noe pokemon in the team. Both texts contains the word "you"
        expect(doc.getAllByText(/you/)).toHaveLength(2)
        expect(doc.getAllByText(/you/)[0].textContent).toContain(text1)
        expect(doc.getAllByText(/you/)[1].textContent).toContain(text2)

        //The button should not be on the page, because there are no pokemon in the team
        expect(doc.queryAllByText(/SAVE TEAM/)).toHaveLength(0)

    });

    test('Test if myTeamOverviewComponent renders correctly with pokemon in team', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <Team currentPokemon={testPokemon1}/>
                    <MyTeamOverviewComponent />
                </RecoilRoot>
            </MockedProvider>
        );

        //Must first add a pokemon to team, in order for the state to change (this functionality is tested somewhere else)
        const add_button : HTMLElement  = doc.getByTestId("add_button")
        fireEvent.click(add_button)

        const button : HTMLElement = doc.getByTestId("team-submit")
        const textField : HTMLElement  = doc.getByTestId("team-name-input")

        //The button and text field should be in the document, since there are pokemon in the team
        expect(button).toBeInTheDocument();
        expect(textField).toBeInTheDocument()

    });

    test('Test if pokemon is removed when clicking remove from team', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <Team currentPokemon={testPokemon1}/>
                    <MyTeamOverviewComponent />
                </RecoilRoot>
            </MockedProvider>
        );

        //Must first add a pokemon to team, in order for the state to change (this functionality is tested somewhere else)
        const add : HTMLElement = doc.getByTestId("add_button")
        fireEvent.click(add)

        const removeButton : HTMLElement = doc.getByTestId("remove-button")

        //Finds text field which should be visible because there are pokemon in the team
        const textField : HTMLElement = doc.getByTestId("team-name-input")

        //Clicks the remove from team button
        fireEvent.click(removeButton)

        //The text field should not be visible, since there are no pokemon in the team
        expect(textField).not.toBeInTheDocument()

    })

    test('Test that "save team"-button is disabled when text field is empty', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <Team currentPokemon={testPokemon1}/>
                    <MyTeamOverviewComponent />
                </RecoilRoot>
            </MockedProvider>
        );

        //Must first add a pokemon to team, in order for the state to change (this functionality is tested somewhere else)
        const add : HTMLElement = doc.getByTestId("add_button")
        fireEvent.click(add)

        //Retrieves the input-element from the textField material-ui-component
        const textFieldInput : Element|null = doc.getByTestId("team-name-input").children.item(1)!.children.item(0)
        const button : HTMLElement = doc.getByTestId("team-submit")

        //Button should be disabled
        expect(button).toBeDisabled()

        //Types into the input
        userEvent.type(textFieldInput!, "Name")

        expect(textFieldInput).toHaveValue("Name")
        expect(button).not.toBeDisabled()
    })

    test('Test that "save team"-button is working', async () => {

        const doc = render(
            <MockedProvider >
                <RecoilRoot>
                    <Team currentPokemon={testPokemon1}/>
                    <MyTeamOverviewComponent />
                </RecoilRoot>
            </MockedProvider>
        );

        //Must first add a pokemon to team (this functionality is tested somewhere else)
        const add : HTMLElement = doc.getByTestId("add_button")
        fireEvent.click(add)

        //Retrieves the input-element from the textField material-ui-component
        const textFieldInput : Element|null = doc.getByTestId("team-name-input").children.item(1)!.children.item(0)
        const button : HTMLElement = doc.getByTestId("team-submit")

        //Types into the input
        userEvent.type(textFieldInput!, "Name")

        expect(button).toBeInTheDocument()
        //Clicks the save-team-button
        fireEvent.click(button);

        //Shows that the button is removed when saving team, which means there are no longer pokemon in the team
        expect(button).not.toBeInTheDocument()

    })
});

describe('Tests for pokemonInTeamComponent: ', () => {

    test('Test if pokemonInTeamComponent renders correctly', async () => {

        const doc =render(
            <MockedProvider>
                <RecoilRoot>
                    <PokemonInTeamComponent pokemon={testPokemon1} />
                </RecoilRoot>
            </MockedProvider>
        );

        await act(async () => {
            await waitForRender();
        });

        expect(doc.getAllByText(/Charizard/)).toHaveLength(1)
        expect(doc.getAllByText(/Charizard/)[0].textContent).toContain("Charizard")

    })

    test('Test that remove-button is enabled', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <PokemonInTeamComponent pokemon={testPokemon1} />
                </RecoilRoot>
            </MockedProvider>
        );

        const removeButton : HTMLElement = doc.getByTestId("remove-button")

        expect(removeButton).not.toBeDisabled();
    })


});