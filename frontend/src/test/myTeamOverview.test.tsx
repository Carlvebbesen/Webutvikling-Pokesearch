import React, {FC, useEffect} from 'react'
import {RecoilRoot, useRecoilValue} from "recoil";
import myTeamOverviewComponent from "../components/myTeamOverviewComponent/myTeamOverviewComponent"
import pokemonInTeamComponent from "../components/pokemonInTeamComponent/pokemonInTeamComponent"
import {render} from "@testing-library/react";
import {pokemonTeam} from "../store";


//ID-er:
//remove_button
//pokemon_accordion

export const RecoilObserver: FC<{ node: any, onChange: Function }> = (props) => {
    const value = useRecoilValue(props.node);
    useEffect(() => props.onChange(value), [props.onChange, value]);
    return null;
};

describe('Tests for current team: ', () => {
    test('Pokemon is visible in team', async () => {
        let onChange = jest.fn();

        const doc = render(
            <RecoilRoot>
                <RecoilObserver node={pokemonTeam} onChange={onChange}/>
            </RecoilRoot>
        );

    })
});