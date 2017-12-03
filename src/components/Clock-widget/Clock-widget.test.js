/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import ClockWidget from './Clock-widget';

const store = {
	dispatch: () => {},
	subscribe: () => {},
	getState: () => ({serverEnv: 'testing'})
};

const context = {
	insertCss: () => {},
	createHref: () => {},
	store
};

describe('ClockWidget', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<ClockWidget context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
