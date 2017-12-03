/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import CalendarWidget from './Calendar-widget';

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

describe('CalendarWidget', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<CalendarWidget context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
