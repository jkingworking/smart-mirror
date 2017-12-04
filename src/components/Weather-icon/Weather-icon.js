import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';
import WeatherIcons from 'react-weathericons';
import weatherIconsList from '../../helpers/weatherIconsList';

const reactAnimatedWeatherIcons = {
	RAIN: 'RAIN',
	SNOW: 'SNOW',
	FOG: 'FOG',
	PARTLY_CLOUDY_NIGHT: 'PARTLY_CLOUDY_NIGHT',
	PARTLY_CLOUDY_DAY: 'PARTLY_CLOUDY_DAY',
	CLEAR_NIGHT: 'CLEAR_NIGHT',
	CLEAR_DAY: 'CLEAR_DAY',
};

function WeatherIcon ({ weather, isDay, animate, ...rest }) {
	console.log('WeatherIcon - weather', weather, getWeatherStatusIcon(weather.id, isDay));
	return animate
		? <ReactAnimatedWeather
			{...rest}
			animate={animate}
			icon={getWeatherIcon(weather.id, isDay, reactAnimatedWeatherIcons)}
		/>
		: <WeatherIcons
			name={getWeatherStatusIcon(weather.id, isDay)}
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
	isDay: true,
	weather: {},
};

export default WeatherIcon;

function getWeatherStatusIcon (status, isDay = true) {
	const iconName = weatherIconsList[status] || (isDay ? 'day-sunny' : 'night-clear');
	console.log('getWeatherStatusIcon - iconName', status, iconName);
	return iconName.replace('{time}', isDay ? 'day' : 'night');
}

function getWeatherIcon (status, isDay = true, icons) {
	const weatherCat = Number(String(status).substr(0, 1));
	switch (true) {
		case weatherCat <= 5:
			return icons.RAIN;
		case weatherCat === 6:
			return icons.SNOW;
		case weatherCat === 7:
			return icons.FOG;
		case (status > 800 && !isDay):
			return icons.PARTLY_CLOUDY_NIGHT;
		case status > 800 :
			return icons.PARTLY_CLOUDY_DAY;
		case !isDay:
			return icons.CLEAR_NIGHT;
		default:
			return icons.CLEAR_DAY;
	}
}