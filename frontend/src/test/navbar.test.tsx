import React from 'react'
import {act, fireEvent, render} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import {RecoilRoot} from "recoil";
import Navbar from "../components/navbar/Navbar";
import {BrowserRouter} from 'react-router-dom'
import {waitForRender} from "./overviewPage.test";

describe('Tests for Navbar: ', () => {

    test('Test Navbar rendering', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <BrowserRouter>
                        <Navbar />
                    </BrowserRouter>
                </RecoilRoot>
            </MockedProvider>
        );

        await act(async () => {
            await waitForRender();
        });

        //Tests that both elements of the navbar is rendered
        expect(doc.getAllByText(/Database/)).toHaveLength(1)
        expect(doc.getAllByText(/Pokemon Teams/)).toHaveLength(1)

    });

    test('Test Navbar navigation', async () => {

        const doc = render(
            <MockedProvider>
                <RecoilRoot>
                    <BrowserRouter>
                        <Navbar />
                    </BrowserRouter>
                </RecoilRoot>
            </MockedProvider>
        );

        const button = doc.getByTestId("nav-teams");

        //Clicks the right side of the navigation-bar in order to get to the my-team-page
        fireEvent.click(button);

        //Checks if the url is correct after navigating to a different page
        expect(global.window.location.pathname).toEqual('/prosjekt3/my-team');

    });

});