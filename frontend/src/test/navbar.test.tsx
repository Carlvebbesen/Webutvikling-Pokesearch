import React from 'react'
import {fireEvent, render} from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import {MockedProvider} from "@apollo/client/testing";
import {RecoilRoot} from "recoil";
import Navbar from "../components/navbar/Navbar";
import {BrowserRouter} from 'react-router-dom'

describe('Tests for Navbar: ', () => {

    test('Test Navbar rendering', async () => {

        const doc = TestRenderer.create(
            <MockedProvider>
                <RecoilRoot>
                    <BrowserRouter>
                        <Navbar />
                    </BrowserRouter>
                </RecoilRoot>
            </MockedProvider>
        );

        //Combines the contents of p-type into one string
        const div = doc.root.findAllByType("p").map(a => a.children).join("");

        const text1 = "Database"
        const text2 = "Pokemon Teams"

        expect(div).toContain(text1)
        expect(div).toContain(text2)

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