import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from './axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

global.localStorage = localStorageMock;

let mock = new MockAdapter(axios);