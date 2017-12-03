/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import WeatherWidget from './Weather-widget';

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

describe('WeatherWidget', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<WeatherWidget context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
