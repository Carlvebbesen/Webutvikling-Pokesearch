import { MockedProvider } from "@apollo/client/testing";
import OverviewPage from "../../src/pages/Overview";
import TableListRow from "../components/tableListRow/tableListRow";
import SortingButton from "../components/sort/sortingButton";
import { StatTable } from "../components/statTable/statTable";
import Filter from "../components/filter/Filter";
import { filteredDataMocks, testPokemon1 } from "./testData";
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
    act(() => {
      fireEvent.click(component);
    });

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
    act(() => {
      fireEvent.click(component);
    });

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
    act(() => {
      fireEvent.click(componentHp);
    });

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
    act(() => {
      fireEvent.change(nameField, { target: { value: "TestPokemonWater" } });
    });
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

// it("renders without error", () => {
//   const component = TestRenderer.create(
//     <MockedProvider mocks={filteredDataMocks} addTypename={false}>
//       <OverviewPage />
//     </MockedProvider>
//   );
//   const correct_p = component.root
//     .findAllByType("p")
//     .map((a) => a.children)
//     .join("");
//   expect(correct_p).toContain("Loading ...");
//   expect(correct_p).toContain("Minimum rating:");
// });

// it("renders one table row correctly", () => {
//   const component = TestRenderer.create(
//     <MockedProvider mocks={filteredDataMocks} addTypename={false}>
//       <TableListRow pokemon={testPokemon1} setPopUpShow={() => {}} />
//     </MockedProvider>
//   );

//   const correct_p = component.root
//     .findAllByType("p")
//     .map((a) => a.children)
//     .join("");
//   const correct_td = component.root
//     .findAllByType("td")
//     .map((a) => a.children)
//     .join("");
//   expect(correct_p).toContain("Charizard");
//   expect(correct_td).toContain("78");
//   expect(correct_td).toContain("84");
//   expect(correct_td).toContain("78");
//   expect(correct_td).toContain("109");
//   expect(correct_td).toContain("85");
//   expect(correct_td).toContain("100");
//   expect(correct_td).toContain("534");
// });

// it("renders sorting button without error", () => {
//   const component = TestRenderer.create(
//     <MockedProvider mocks={filteredDataMocks} addTypename={false}>
//       <SortingButton
//         currentSort={"Ascending"}
//         label={"Button"}
//         name={"test"}
//         sort={() => {}}
//       />
//     </MockedProvider>
//   );
//   const correct_p = component.root
//     .findAllByType("p")
//     .map((a) => a.children)
//     .join("");
//   expect(correct_p).toContain("Button");
//   expect(correct_p).not.toContain("test"); //should only show label
// });

// it("renders stat table without error", () => {
//   const stats = [
//     { name: "Hp", value: 1 },
//     { name: "Attack", value: 2 },
//     { name: "Defence", value: 3 },
//     { name: "Sp. Atk", value: 4 },
//     { name: "Sp. Def", value: 5 },
//     { name: "Speed", value: 6 },
//   ];
//   const component = TestRenderer.create(
//     <MockedProvider mocks={filteredDataMocks} addTypename={false}>
//       <StatTable stats={stats} />
//     </MockedProvider>
//   );
//   const correct_span = component.root
//     .findAllByType("span")
//     .map((a) => a.children)
//     .join("");
//   expect(correct_span).toContain("Hp");
//   expect(correct_span).toContain("Attack");
//   expect(correct_span).toContain("Sp. Atk");
//   expect(correct_span).toContain("Defence");
//   expect(correct_span).toContain("Sp. Def");
//   expect(correct_span).toContain("Speed");
//   expect(correct_span).toContain("1");
//   expect(correct_span).toContain("2");
//   expect(correct_span).toContain("3");
//   expect(correct_span).toContain("4");
//   expect(correct_span).toContain("5");
//   expect(correct_span).toContain("6");
// });

// it("renders filter without error", () => {
//   const component = TestRenderer.create(
//     <MockedProvider mocks={filteredDataMocks} addTypename={false}>
//       <Filter
//         name={""}
//         rating={0}
//         setName={() => {}}
//         setRating={() => {}}
//         setType={() => {}}
//         type={[""]}
//       />
//     </MockedProvider>
//   );
//   const correct_input = component.root.findAllByType("input");
//   expect(correct_input.length).toBeGreaterThanOrEqual(13); //one for each half a star = 11 + Name and type
//   const correct_p = component.root
//     .findAllByType("p")
//     .map((a) => a.children)
//     .join("");
//   expect(correct_p).toContain("Minimum rating:");
// });
