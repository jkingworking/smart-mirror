import React from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import Widget from '../Widget';
// import background from './background-alt.gif';
// import backgroundMov from './background-alt.mp4';
import backgroundMov from './globe.mp4';

function ClockWidget ({className, date}) {
	const hrs = date.getHours();
	return (
		<Widget className={`component-clock-widget ${className}`}>
      <video className="component-clock-widget__video" autoPlay loop>
        <source src={backgroundMov} type="video/mp4" />
      </video>
			<h1 className="clock">
				<span className="clock__hrs">
					{hrs ? hrs <= 12 ? hrs : hrs - 12 : 12}
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
