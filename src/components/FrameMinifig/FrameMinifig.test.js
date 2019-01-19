import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FrameMinifig from './FrameMinifig';

configure({adapter: new Adapter()});

describe('<FrameMinifig />', () => {
    it('should render an empty div if there is no props', () => {
        const wrapper = shallow(<FrameMinifig />);
        expect(wrapper.find('div').at(1).html()).toBe('<div></div>')
    });
    it('should render an <img> and 3 <a> if there are props', () => {
        const props = {
            minifig: 'sw001',
            name: 'Battle Droid',
            set: 7929
        }
        const wrapper = shallow(<FrameMinifig {...props} />);
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('a')).toHaveLength(3);
        expect(wrapper.find('a').at(0).text()).toBe(props.name);
        expect(wrapper.find('a').at(1).text()).toBe(props.minifig);
        expect(wrapper.find('a').at(2).text()).toContain(props.set);
    });
});