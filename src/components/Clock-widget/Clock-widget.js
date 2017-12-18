import React from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import Widget from '../Widget';
import {days} from 'date-names'
// import backgroundMov from './waves.mp4';

function ClockWidget ({className, date}) {
	const hrs = date.getHours();
	const hour = hrs ? hrs <= 12 ? hrs : hrs - 12 : 12;
	// const ordinal = hrs < 12 ? 'am' : 'pm';
	return (
		<Widget className={`component-clock-widget ${className}`}>
      {/*<video className="component-clock-widget__video" autoPlay loop>*/}
        {/*<source src={backgroundMov} type="video/mp4" />*/}
      {/*</video>*/}
			<h1 className="clock underline">
				<span className="clock__hrs">{hour}</span>
				<span className="clock__separator">:</span>
				<span className="clock__min">
					{leftPad(date.getMinutes(), 2, '0')}
				</span>
			</h1>
			<h2 className="day">
				{days[date.getDay()]}
			</h2>
			<h3 className="date">
				{`${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`}
			</h3>
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
