import TestRenderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/client/testing';
import OverviewPage from '../../src/pages/Overview';
import TableListRow from "../components/tableListRow/tableListRow";
import {Pokemon, Stats} from "../utils/Pokemon";
import SortingButton from "../components/sort/sortingButton";
import {StatTable} from "../components/statTable/statTable";
import Filter from "../components/filter/Filter";
import {overviewMocks} from "./testData";




const single_pokemon_mock = {
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

}


it('renders without error', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={overviewMocks} addTypename={false}>
            <OverviewPage/>
        </MockedProvider>,
    );
    const correct_p = component.root.findAllByType("p").map(a => a.children).join("");
    expect(correct_p).toContain('Loading ...');
    expect(correct_p).toContain('Minimum rating:');
});

it('renders one table row correctly', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={overviewMocks} addTypename={false}>
            <TableListRow pokemon={single_pokemon_mock as unknown as Pokemon} setPopUpShow={() => {
            }}/>
        </MockedProvider>,
    );

    const correct_p = component.root.findAllByType("p").map(a => a.children).join("");
    const correct_td = component.root.findAllByType("td").map(a => a.children).join("");
    expect(correct_p).toContain('Charizard');
    expect(correct_td).toContain('78');
    expect(correct_td).toContain('84');
    expect(correct_td).toContain('78');
    expect(correct_td).toContain('109');
    expect(correct_td).toContain('85');
    expect(correct_td).toContain('100');
    expect(correct_td).toContain('534');
});


it('renders sorting button without error', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={overviewMocks} addTypename={false}>
            <SortingButton currentSort={"Ascending"} label={"Button"} name={"test"} sort={()=>{}}/>
        </MockedProvider>,
    );
    const correct_p = component.root.findAllByType("p").map(a => a.children).join("");
    expect(correct_p).toContain('Button');
    expect(correct_p).not.toContain('test'); //should only show label
});

it('renders stat table without error', () => {
    const stats = [{name: "Hp", value: 1},
        {name: "Attack", value: 2},
        {name: "Defence", value: 3},
        {name: "Sp. Atk", value: 4},
        {name: "Sp. Def", value: 5},
        {name: "Speed", value: 6}]
    const component = TestRenderer.create(
        <MockedProvider mocks={overviewMocks} addTypename={false}>
            <StatTable  stats={stats}/>
        </MockedProvider>,
    );
    const correct_span = component.root.findAllByType("span").map(a => a.children).join("");
    expect(correct_span).toContain('Hp');
    expect(correct_span).toContain('Attack');
    expect(correct_span).toContain('Sp. Atk');
    expect(correct_span).toContain('Defence');
    expect(correct_span).toContain('Sp. Def');
    expect(correct_span).toContain('Speed');
    expect(correct_span).toContain('1');
    expect(correct_span).toContain('2');
    expect(correct_span).toContain('3');
    expect(correct_span).toContain('4');
    expect(correct_span).toContain('5');
    expect(correct_span).toContain('6');
});


it('renders filter without error', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={overviewMocks} addTypename={false}>
            <Filter name={""} rating={0} setName={()=>{}} setRating={()=>{}} setType={()=>{}} type={[""]}/>
        </MockedProvider>
    );
    const correct_input = component.root.findAllByType("input");
    expect(correct_input.length).toBeGreaterThanOrEqual(13) //one for each half a star = 11 + Name and type
    const correct_p = component.root.findAllByType("p").map(a => a.children).join("");
    expect(correct_p).toContain('Minimum rating:');
});
