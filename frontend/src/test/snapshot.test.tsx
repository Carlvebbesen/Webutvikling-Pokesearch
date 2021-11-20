import { MockedProvider } from "@apollo/client/testing";
import Popup from "../components/popup/Popup";
import {
  filteredData,
  mockFilter,
  testPokemon1,
  testPokemon2,
} from "./testData";
import SortingButtonsList from "../components/sort/sortingButtonsList";
import SortingButton from "../components/sort/sortingButton";
import TableListRow from "../components/tableListRow/tableListRow";
import BackgroundPopUp from "../components/backgroundPopup/backgroudPopUp";
import { render } from "@testing-library/react";
import { DisplayTeams } from "../components/displayTeams/displayTeams";
import MyTeamOverviewComponent from "../components/myTeamOverviewComponent/myTeamOverviewComponent";
import PokemonInTeamComponent from "../components/pokemonInTeamComponent/pokemonInTeamComponent";
import { StatTable } from "../components/statTable/statTable";
import Team from "../components/team/Team";
import { TeamInDisplayTeams } from "../components/teamInDisplayTeams/teamInDisplayTeams";
import { MyTeam } from "../pages/myTeam";
import { RecoilRoot } from "recoil";

it("Snapshot test for Backdrop component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <BackgroundPopUp clicked={() => {}} show={true} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for PopUp component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <Popup pokemonId={1} setOpen={() => {}} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for SortList component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <SortingButtonsList sortByValue={() => {}} activeButton={"HP"} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for SortButton component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <SortingButton
        name={"HP"}
        currentSort={undefined}
        sort={() => {}}
        label={""}
      />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});

it("Snapshot test for ListPokemonRow component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <TableListRow
        pokemon={filteredData.pokemons[0]}
        setPopUpShow={() => {}}
      />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});

it("Snapshot test for displayTeams component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <DisplayTeams pokemonClicked={() => {}} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for myTeamOverview component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <RecoilRoot>
        <MyTeamOverviewComponent />
      </RecoilRoot>
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for PokemonInTeam component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <RecoilRoot>
        <PokemonInTeamComponent pokemon={testPokemon1} />
      </RecoilRoot>
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for popUp component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <Popup pokemonId={1} setOpen={() => {}} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for sortingButton component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <SortingButton
        name={"hp"}
        label={"Hp"}
        currentSort={undefined}
        sort={() => {}}
      />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for sortingButtonList component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <SortingButtonsList sortByValue={() => {}} activeButton={undefined} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for statTable component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <StatTable
        stats={[
          { name: "hp", value: 30 },
          { name: "attack", value: 40 },
          { name: "defense", value: 50 },
        ]}
      />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for tableListRow component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <TableListRow pokemon={testPokemon1} setPopUpShow={() => {}} />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for teamInDisplayTeams component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <TeamInDisplayTeams
        team={{
          name: "TestTeam",
          pokemon: [testPokemon1, testPokemon2],
        }}
        pokemonClicked={() => {}}
      />
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
it("Snapshot test for myTeam component", () => {
  const component = render(
    <MockedProvider mocks={mockFilter} addTypename={false}>
      <RecoilRoot>
        <MyTeam />
      </RecoilRoot>
    </MockedProvider>
  );
  expect(component).toMatchSnapshot();
});
