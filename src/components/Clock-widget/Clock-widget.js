import React from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import Widget from '../Widget';
import background from './background.gif';

function ClockWidget ({className, date}) {
	const hrs = date.getHours();
	return (
		<Widget className={`component-clock-widget ${className}`}>
			<div
				className="component-clock-widget__background"
				style={{
					backgroundImage: `url(${background})`
				}}
			/>
			<h1 className="clock">
				<span className="clock__hrs">
					{hrs ? hrs < 12 ? hrs : hrs - 12 : 12}
				</span>
				<span className="clock__separator">:</span>
				<span className="clock__min">
					{leftPad(date.getMinutes(), 2, '0')}
				</span>
			</h1>
		</Widget>
	);
}

ClockWidget.propTypes = {
	className: PropTypes.string,
	date: PropTypes.instanceOf(Date).isRequired
};

ClockWidget.defaultProps = {
	className: ''
};

export default ClockWidget;
