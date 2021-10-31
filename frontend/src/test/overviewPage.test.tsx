import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import OverviewPage from '../pages/Overview';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from './testData';


Enzyme.configure({ adapter: new ReactSixteenAdapter() });

test('renders the App Component', () => {
    const wrapper = shallow(
    <MockedProvider mocks={mocks} addTypename={false}>
    <OverviewPage/>
    </MockedProvider>
    );
   const hp =  wrapper.find("hp")
    expect(hp.prop(name) == "hp");
  });


