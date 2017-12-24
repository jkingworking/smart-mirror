import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget';
import {isEqual, get, head} from 'lodash';
import FiveDayForecast from '../Five-day-forecast';
import tempFormat from '../../helpers/tempFormat';
import WeatherIcon from '../Weather-icon'

const openWeatherKey = 'e687965e87e8cd5fe60db69c8d772841';

class WeatherWidget extends Component {
	static propTypes = {
		className: PropTypes.string,
		coordinates: PropTypes.oneOfType([
			PropTypes.shape({
				latitude: PropTypes.number,
				longitude: PropTypes.number,
			}),
			PropTypes.bool
		]),
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
		location: {},
	}

	componentDidMount () {
		this.refreshInterval = setInterval(this.refreshData, 1 * 60 * 1000); // update the weather every 10 min
		this.refreshData(this.props);
		this.getCityName(this.props.coordinates);
	}

	componentWillReceiveProps (props) {
		if (!isEqual(props.coordinates, this.props.coordinates)) {
			this.refreshData(props);
			this.getCityName(props.coordinates);
		}
	}

	componentWillUnmount () {
		clearInterval(this.refreshInterval);
	}

	render () {
		const { className, showToday, show5Day } = this.props;
		const { weather, forecast, weatherUpdated, forecastUpdated, location } = this.state;
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
								{location.short_name}
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

	refreshData = props => {
		props = props || this.props;
		if (!props.coordinates) {
			return;
		}

		this.getWeatherNow(props.coordinates);
		this.getWeatherForecast(props.coordinates);
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

	getCityName = async ({ latitude, longitude }) => {
		if (!latitude || !longitude) {
			return;
		}

		const mapQuery = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`, {
			method: 'GET'
		});
		const mapData = await mapQuery.json();
		const location = get(head(mapData.results), 'address_components', []).find(component => component.types.includes('locality'));
		this.setState({location});
	}
}

export default WeatherWidget;

function getTemp (weatherData) {
	const temp = get(weatherData, 'main.temp');
	return tempFormat(temp);
}

