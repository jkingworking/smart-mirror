import React from 'react';
import PropTypes from 'prop-types';
import weatherIconsList from '../../helpers/weatherIconsList';
import {get, head} from 'lodash';

function WeatherIcon ({ weather, animate, ...rest }) {
	const weatherData = head(get(weather, 'weather', []));
	const { sunrise, sunset } = get(weather, 'sys', {});
	const now = new Date();
	const sunriseDate = new Date(sunrise * 1000);
	const sunsetDate = new Date(sunset * 1000);
	const isToday = ymd(sunriseDate) === ymd(now);

	const isDay = now < sunriseDate
		? false
		: (isToday && now < sunsetDate) || !isToday;

	return <i
			className={`pe-is-w-${getWeatherStatusIcon(weatherData.id, isDay)}`}
		/>
}

WeatherIcon.propTypes = {
	className: PropTypes.string,
	color: PropTypes.string,
	animate: PropTypes.bool,
	isDay: PropTypes.bool,
	weather: PropTypes.object,
};

WeatherIcon.defaultProps = {
	className: '',
	color: 'white',
	animate: false,
	weather: {},
};

export default WeatherIcon;

function getWeatherStatusIcon (status, isDay = true) {
	const iconName = weatherIconsList[status] || (isDay ? 'sun-1' : 'moon-1');
	return iconName.replace('{time}', isDay ? 'day' : 'night').replace('{body}', isDay ? 'sun' : 'moon');
}

function ymd(dt) {
    return `${dt.getFullYear()}${dt.getMonth()}{${dt.getDate()}}`;
}
