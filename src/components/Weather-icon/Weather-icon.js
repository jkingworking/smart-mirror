import React from 'react';
import PropTypes from 'prop-types';
import weatherIconsList from '../../helpers/weatherIconsList';
import {get, head} from 'lodash';

function WeatherIcon ({ weather, animate, ...rest }) {
	const weatherData = head(get(weather, 'weather', []));
	const dt = get(weather, 'dt');
	const sys = get(weather, 'sys', {});
	const isToday = Math.round((new Date()).getTime() / 1000) >= dt;
	const isBeforeSunrise = dt < sys.sunrise;
	const isBeforeSunset = dt < sys.sunset;
	const isDay = !isToday || (!isBeforeSunrise && isBeforeSunset);

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
	return iconName.replace('{time}', isDay ? 'day' : 'night');
}
