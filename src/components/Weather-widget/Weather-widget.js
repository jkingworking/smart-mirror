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
		showToday: PropTypes.bool,
		show5Day: PropTypes.bool,
	};

	static defaultProps = {
		className: '',
		showToday: false,
		show5Day: false,
	};

	state = {
		weather: {},
		forecast: {},
		weatherUpdated: new Date(),
		forecastUpdated: new Date(),
	}

	componentWillReceiveProps (props) {
		if (!isEqual(props.coordinates, this.props.coordinates)) {
			this.getWeatherNow(props.coordinates);
			this.getWeatherForecast(props.coordinates);
		}
	}

	render () {
		const { className, showToday, show5Day } = this.props;
		const { weather, forecast, weatherUpdated, forecastUpdated } = this.state;
		const today = new Date();

		return get(this.state, 'weather.dt')
			? (
				<Widget className={`component-weather-widget ${className}`}>
					{showToday && weatherUpdated.getDate() === today.getDate() && (
						<div>
							<div className="current-weather underline neon">
								<h1 className="current-weather__icon">
									<WeatherIcon
										weather={weather}
									/>
								</h1>
								<h1>
									<span className="current-weather__temp">{getTemp(weather)}</span>
								</h1>
							</div>
							<h2 className="weather-city neon">
								{weather.name}
							</h2>
						</div>
					)}
					{show5Day && forecastUpdated.getDate() === today.getDate() && (
						<div className="weather-forecast">
							<FiveDayForecast
								forecast={forecast}
							/>
						</div>
					)}
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
			weather: weatherData,
			weatherUpdated: new Date(),
		});
	}

	getWeatherForecast = async ({ latitude, longitude }) => {
		const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${openWeatherKey}`, {
			method: 'GET',
		});
		const weatherData = await data.json();

		this.setState({
			forecast: weatherData,
			forecastUpdated: new Date(),
		});
	}
}

export default WeatherWidget;

function getTemp (weatherData) {
	const temp = get(weatherData, 'main.temp');
	return tempFormat(temp);
}

