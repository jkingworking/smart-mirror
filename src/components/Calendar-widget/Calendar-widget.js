import React from 'react';
import PropTypes from 'prop-types';
import ReactDayPicker from 'react-day-picker';
import ordinal from 'ordinal'
import {days, months} from 'date-names'
import Widget from '../Widget';

function CalendarWidget ({ className, date }) {
	return (
		<Widget className={`component-calendar-widget ${className}`}>
			<div className="calendar-widget__date">
				{days[ date.getDay() ]}, {months[ date.getMonth() ]} {ordinal(date.getDate())}
			</div>
			<div className="calendar-widget__calendar">
				<ReactDayPicker/>
			</div>
		</Widget>
	);
}

CalendarWidget.propTypes = {
	className: PropTypes.string,
	date: PropTypes.instanceOf(Date).isRequired
};

CalendarWidget.defaultProps = {
	className: ''
};
export default CalendarWidget;
