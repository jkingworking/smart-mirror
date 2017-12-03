import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';

function WeatherIcon ({ weather, isDay, ...rest }) {

	return (
		<ReactAnimatedWeather
			{...rest}
			icon={getWeatherIcon(weather.id, isDay)}
		/>
	);
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
	animate: true,
	isDay: true,
	weather: {},
};

export default WeatherIcon;

function getWeatherIcon(status, isDay = true){
	const weatherCat = Number(String(status).substr(0, 1));
	switch (true) {
		case weatherCat <= 5:
			return 'RAIN';
		case weatherCat === 6:
			return 'SNOW';
		case weatherCat === 7:
			return 'FOG';
		case (status > 800 && !isDay):
			return 'PARTLY_CLOUDY_NIGHT';
		case status > 800 :
			return 'PARTLY_CLOUDY_DAY';
		case !isDay:
			return 'CLEAR_NIGHT';
		default:
			return 'CLEAR_DAY';
	}
}