/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import WeatherIcon from './Weather-icon';

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

describe('WeatherIcon', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<WeatherIcon context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
