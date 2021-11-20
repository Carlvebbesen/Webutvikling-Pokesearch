import { MockedProvider } from "@apollo/client/testing";
import OverviewPage from "../../src/pages/Overview";
import { filteredDataMocks } from "./testData";
import { act, fireEvent, render } from "@testing-library/react";

export const waitForRender = async (duration = 0) => {
  //To wait for the component to render, doing this by waiting for the next render cycle
  await new Promise((resolve) => {
    act(() => {
      setTimeout(resolve, duration);
    });
  });
};

//For all the test the name of the pokemon represent what value is being tested, therfore this
//could easly be used to se why a test fails

describe("Test Sorting correctly", () => {
  test("init render of objects", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });
    //Test that the init render, with the deafult pokemon sorted by entrynumber is correct
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonGrassPoison"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonWater"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonFire"
    );
  });

  test("Sort by hp descending", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await act(async () => {
      await waitForRender();
    });

    const component = doc.getByTestId("hp");
      fireEvent.click(component);

    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await act(async () => {
      await waitForRender();
    });

    //Check if elements is sorted by hp desc
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonWaterHp45"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonFireHp14"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonGrassPoisonHp1"
    );
  });

  test("Sort by hp ascending", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await act(async () => {
      await waitForRender();
    });

    const component = doc.getByTestId("hp");
      fireEvent.click(component);

    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await act(async () => {
      await waitForRender();
    });
    //click on hp twice to get it sorted by ascending, the first is descending by default
    const componentHp = doc.getByTestId("hp");
      fireEvent.click(componentHp);

    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await act(async () => {
      await waitForRender();
    });

    //Check if elements is sorted by hp asc
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonGrassPoisonHp1"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonFireHp14"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonWaterHp45"
    );
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
  });
  test("Sort by hp then pokemonId", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });

    const component = doc.getByTestId("hp");
    fireEvent.click(component);
    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });
    //Test if the pokemons is sortd by hp, descending
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonWaterHp45"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonFireHp14"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonGrassPoisonHp1"
    );
    const componentPokemonId = doc.getByTestId("pokemonId");
    fireEvent.click(componentPokemonId);
    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });
    //Rerender to se if the pokemon is sorted by pokemonId decending

    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonFirePokemonId3"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonWaterPokemonId2"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonGrassPoisonPokemonId1"
    );
  });
});

describe("Test filtering fields", () => {
  test("inputNameField", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });

    const nameField: any = doc.getByTestId("name_input");
      fireEvent.change(nameField, { target: { value: "TestPokemonWater" } });
    //to wait for the debounce on name search
    await act(async () => {
      await waitForRender(250);
    });
    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });
    //the only pokemon that should be shown is the TestPokemonWater, because the namefield has this value
    expect(nameField.value).toBe("TestPokemonWater");
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(1);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonWater"
    );
  });
  test("filter on stars", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });

    const filterRating = doc.getAllByTestId("StarBorderIcon");
    //click on the 3 star, it is 0 indexed and possible to click on half stars. Therefore starpart 6 is clicked
    fireEvent.click(filterRating[5]);
    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await act(async () => {
      await waitForRender();
    });
    //only one pokemon with the required rating
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(1);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonRating"
    );
  });
});

test("Not show PopUp when nothing is clicked", async () => {
  const doc = render(
    <MockedProvider mocks={filteredDataMocks} addTypename={false}>
      <OverviewPage />
    </MockedProvider>
  );
  await act(async () => {
    await waitForRender();
  });
  expect(doc.queryByTestId("pokemonPopup")).toBe(null);
});
