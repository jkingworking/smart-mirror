/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import FiveDayForecast from './Five-day-forecast';

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

describe('FiveDayForecast', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<FiveDayForecast context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
