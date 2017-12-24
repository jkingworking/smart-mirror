import React from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import Widget from '../Widget';
import {days} from 'date-names'
import HolidayGreeting from '../Holiday-greeting';

function ClockWidget ({className, date}) {
	const hrs = date.getHours();
	const hour = hrs ? hrs <= 12 ? hrs : hrs - 12 : 12;
	return (
		<Widget className={`component-clock-widget ${className}`}>
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
			<HolidayGreeting
				className="neon"
				date={date}
			/>
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
