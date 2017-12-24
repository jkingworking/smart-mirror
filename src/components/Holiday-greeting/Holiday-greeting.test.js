/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import HolidayGreeting from './Holiday-greeting';

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

describe('HolidayGreeting', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<HolidayGreeting context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
