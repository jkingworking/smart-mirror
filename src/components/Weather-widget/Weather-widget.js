import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget';
import {isEqual, get} from 'lodash';
import FiveDayForecast from '../Five-day-forecast';
import tempFormat from '../../helpers/tempFormat';
import WeatherIcon from '../Weather-icon'

const openWeatherKey = 'e687965e87e8cd5fe60db69c8d772841';

class WeatherWidget extends Component {
	static propTypes = {
		className: PropTypes.string,
		coordinates: PropTypes.shape({
			latitude: PropTypes.number,
			longitude: PropTypes.number,
		}),
	};

	static defaultProps = {
		className: ''
	};

	state = {
		weather: {},
		forecast: {}
	}

	componentWillReceiveProps (props) {
		if (!isEqual(props.coordinates, this.props.coordinates)) {
			this.getWeatherNow(props.coordinates);
			this.getWeatherForecast(props.coordinates);
		}
	}

	render () {
		const { className } = this.props;
		const { weather, forecast } = this.state;
		return get(this.state, 'weather.dt')
			? (
				<Widget className={`component-weather-widget ${className}`}>
					<div className="current-weather neon">
						<h2 className="current-weather__icon">
							<WeatherIcon
								weather={get(weather, 'weather[0]')}
								isDay={get(weather, 'dt') < get(weather, 'main.sunset')}
							/>
						</h2>
						<h1 className="current-weather__temp">
							{getTemp(weather)}
						</h1>
					</div>
					<div className="weather-city">
						{weather.name}
					</div>
					<div className="weather-forecast">
						<FiveDayForecast
							forecast={forecast}
						/>
					</div>
				</Widget>
			)
			: null;

	}

	getWeatherNow = async ({ latitude, longitude }) => {
		const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${openWeatherKey}`, {
			method: 'GET',
		});
		const weatherData = await data.json();
		this.setState({
			weather: weatherData
		});
	}

	getWeatherForecast = async ({ latitude, longitude }) => {
		const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${openWeatherKey}`, {
			method: 'GET',
		});
		const weatherData = await data.json();

		this.setState({
			forecast: weatherData
		});
	}
}

export default WeatherWidget;

function getTemp (weatherData) {
	const temp = get(weatherData, 'main.temp');
	return tempFormat(temp);
}

