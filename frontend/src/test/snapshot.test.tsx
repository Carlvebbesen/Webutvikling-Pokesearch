import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import Backdrop from '../components/backdrop/backdrop';
import Filter from '../components/filter/Filter';
import Popup from '../components/popup/Popup';
import SimpleTable from '../components/simpleTable/SimpleTable';
import { mocks, filteredData } from './testData';
import SortingButtonsList from '../components/sort/sortingButtonsList';
import SortingButton from '../components/sort/sortingButton';
import Stats from '../components/stats/Stats';
import TableListRow from '../components/tableListRow/tableListRow';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

it('Snapshot test for App component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
it('Snapshot test for Backdrop component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Backdrop clicked={()=>{}} show={true}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
it('Snapshot test for Filter component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Filter type={[]} name={''} rating={0} setType={()=>{}} setName={()=>{}} setRating={()=>{}}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
it('Snapshot test for PopUp component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup pokemonID={1} setOpen={()=> {}}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
  it('Snapshot test for SimpleTable component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SimpleTable data={filteredData} changePage={()=>{}} changeRowsPerPage={()=>{}} setPopUpId={()=>{}} page={0} rowsPerPage={25} activeSortButton={"hp"} sortPokemon={()=>{}}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
  it('Snapshot test for SortList component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SortingButtonsList sortByValue={()=>{}} activeButton={"HP"}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
  it('Snapshot test for SortButton component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SortingButton name={'HP'} currentSort={undefined} sort={()=>{}}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
  it('Snapshot test for Stats component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Stats Hp={50} Atk={50} Def={50} SpAtk={50} SpDef={50} Speed={50}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });
  
  it('Snapshot test for ListPokemonRow component', () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TableListRow pokemon={filteredData.pokemons[0]} setPopUpShow={()=>{}}/>
      </MockedProvider>
    )
    expect(component).toMatchSnapshot();
  });


