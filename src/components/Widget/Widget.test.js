/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Widget from './Widget';

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

describe('Widget', () => {

	it('renders correctly', () => {
		const wrapper = shallow(
			<Widget context={context} />
		);

		expect(wrapper).to.be.true;
	});

}); */
