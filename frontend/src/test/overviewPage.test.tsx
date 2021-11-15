import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import OverviewPage from "../../src/pages/Overview";
import TableListRow from "../components/tableListRow/tableListRow";
import { Pokemon } from "../utils/Pokemon";
import SortingButton from "../components/sort/sortingButton";
import { StatTable } from "../components/statTable/statTable";
import Filter from "../components/filter/Filter";
import { filteredDataMocks } from "./testData";
import { act, fireEvent, render } from "@testing-library/react";

const single_pokemon_mock = {
  name: "Charizard",
  pokeTypes: ["fire", "flying"],
  sprite_url:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
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
  usage_count: 2,
};

describe("Test Sorting correctly", () => {
  test("init render of objects", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });
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

    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
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

    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });

    //Check if elements is sorted by hp desc
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonWater"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonFire"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonGrassPoison"
    );
  });

  test("Sort by hp ascending", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
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

    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });
    const componentHp = doc.getByTestId("hp");
    act(() => {
      fireEvent.click(componentHp);
    });

    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );

    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });

    //Check if elements is sorted by hp asc
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonGrassPoison"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonFire"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonWater"
    );
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
  });
  test("Sort by hp then pokemonId", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
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
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });

    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(3);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonWater"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonFire"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonGrassPoison"
    );
    const componentPokemonId = doc.getByTestId("pokemonId");
    act(() => {
      fireEvent.click(componentPokemonId);
    });
    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonFire"
    );
    expect(doc.getAllByText(/TestPokemon/)[1].textContent).toEqual(
      "TestPokemonWater"
    );
    expect(doc.getAllByText(/TestPokemon/)[2].textContent).toEqual(
      "TestPokemonGrassPoison"
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
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });
    const nameField: HTMLElement = doc.getByTestId("name_input");
    act(() => {
      //   fireEvent.click(nameField);
      fireEvent.change(nameField, { target: { value: "TestPokemonWater" } });
    });
    //to wait for the debounce on name search
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 250);
      });
    });
    doc.rerender(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });
    expect(nameField.value).toBe("TestPokemonWater");
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(1);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonWater"
    );
  });
  test("filter on type", async () => {
    const doc = render(
      <MockedProvider mocks={filteredDataMocks} addTypename={false}>
        <OverviewPage />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      act(() => {
        setTimeout(resolve, 0);
      });
    });

    await act(async () => {
      const pokemonTypesFire = doc.getByTestId("types_input");
      fireEvent.click(pokemonTypesFire);
      const pokemonTypesTypes_input = await doc.findByTestId(
        "type-option-fire"
      );
      fireEvent.click(pokemonTypesTypes_input);
    });
    expect(doc.getAllByText(/TestPokemon/)).toHaveLength(1);
    expect(doc.getAllByText(/TestPokemon/)[0].textContent).toEqual(
      "TestPokemonFire"
    );
  });
});

it("renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={filteredDataMocks} addTypename={false}>
      <OverviewPage />
    </MockedProvider>
  );
  const correct_p = component.root
    .findAllByType("p")
    .map((a) => a.children)
    .join("");
  expect(correct_p).toContain("Loading ...");
  expect(correct_p).toContain("Minimum rating:");
});

it("renders one table row correctly", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={filteredDataMocks} addTypename={false}>
      <TableListRow
        pokemon={single_pokemon_mock as unknown as Pokemon}
        setPopUpShow={() => {}}
      />
    </MockedProvider>
  );

  const correct_p = component.root
    .findAllByType("p")
    .map((a) => a.children)
    .join("");
  const correct_td = component.root
    .findAllByType("td")
    .map((a) => a.children)
    .join("");
  expect(correct_p).toContain("Charizard");
  expect(correct_td).toContain("78");
  expect(correct_td).toContain("84");
  expect(correct_td).toContain("78");
  expect(correct_td).toContain("109");
  expect(correct_td).toContain("85");
  expect(correct_td).toContain("100");
  expect(correct_td).toContain("534");
});

it("renders sorting button without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={filteredDataMocks} addTypename={false}>
      <SortingButton
        currentSort={"Ascending"}
        label={"Button"}
        name={"test"}
        sort={() => {}}
      />
    </MockedProvider>
  );
  const correct_p = component.root
    .findAllByType("p")
    .map((a) => a.children)
    .join("");
  expect(correct_p).toContain("Button");
  expect(correct_p).not.toContain("test"); //should only show label
});

it("renders stat table without error", () => {
  const stats = [
    { name: "Hp", value: 1 },
    { name: "Attack", value: 2 },
    { name: "Defence", value: 3 },
    { name: "Sp. Atk", value: 4 },
    { name: "Sp. Def", value: 5 },
    { name: "Speed", value: 6 },
  ];
  const component = TestRenderer.create(
    <MockedProvider mocks={filteredDataMocks} addTypename={false}>
      <StatTable stats={stats} />
    </MockedProvider>
  );
  const correct_span = component.root
    .findAllByType("span")
    .map((a) => a.children)
    .join("");
  expect(correct_span).toContain("Hp");
  expect(correct_span).toContain("Attack");
  expect(correct_span).toContain("Sp. Atk");
  expect(correct_span).toContain("Defence");
  expect(correct_span).toContain("Sp. Def");
  expect(correct_span).toContain("Speed");
  expect(correct_span).toContain("1");
  expect(correct_span).toContain("2");
  expect(correct_span).toContain("3");
  expect(correct_span).toContain("4");
  expect(correct_span).toContain("5");
  expect(correct_span).toContain("6");
});

it("renders filter without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={filteredDataMocks} addTypename={false}>
      <Filter
        name={""}
        rating={0}
        setName={() => {}}
        setRating={() => {}}
        setType={() => {}}
        type={[""]}
      />
    </MockedProvider>
  );
  const correct_input = component.root.findAllByType("input");
  expect(correct_input.length).toBeGreaterThanOrEqual(13); //one for each half a star = 11 + Name and type
  const correct_p = component.root
    .findAllByType("p")
    .map((a) => a.children)
    .join("");
  expect(correct_p).toContain("Minimum rating:");
});
