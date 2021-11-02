import { render } from 'enzyme';
import Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import OverviewPage from '../pages/Overview';
import { MockedProvider } from '@apollo/client/testing';
import { mockFilter } from './testData';


Enzyme.configure({ adapter: new ReactSixteenAdapter() });

// test('renders the App Component', () => {
//     const wrapper = render(
//     <MockedProvider mocks={mockFilter} addTypename={false}>
//     <OverviewPage/>
//     </MockedProvider>
//     );
//     wrapper.find()


//   });


