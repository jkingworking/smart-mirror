import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {get, isEqual} from 'lodash';
import {abbreviated_days} from 'date-names'
import WeatherIcon from '../Weather-icon';
import tempFormat from '../../helpers/tempFormat';

class FiveDayForecast extends Component {
	static propTypes = {
		className: PropTypes.string,
		forecast: PropTypes.shape({
			city: PropTypes.object,
			list: PropTypes.arrayOf(PropTypes.shape({
				dt: PropTypes.number,
				weather: PropTypes.arrayOf(PropTypes.shape({
					description: PropTypes.string,
					icon: PropTypes.string,
					id: PropTypes.number,
					main: PropTypes.string,
				})),
				main: PropTypes.shape({
					grnd_level: PropTypes.number,
					humidity: PropTypes.number,
					pressure: PropTypes.number,
					sea_level: PropTypes.number,
					temp: PropTypes.number,
					temp_kf: PropTypes.number,
					temp_max: PropTypes.number,
					temp_min: PropTypes.number,
				})
			}))
		})
	};

	static defaultProps = {
		className: ''
	};

	constructor (props) {
		super();
		this.state = {
			activeIndex: 0,
			days: getDaysFromForecast(props.forecast),
			moveForward: true
		};
	}

	componentDidMount() {
		// this.rotationInterval = setInterval(this.rotateDay, 5 * 1000);
	}

	componentWillUnmount() {
		clearInterval(this.rotationInterval);
	}

	componentWillReceiveProps (props) {
		if (!isEqual(props.forecast, this.props.forecast)) {
			this.setState({days: getDaysFromForecast(props.forecast)});
		}
	}

	rotateDay = () => {
		const {
			activeIndex, moveForward, days
		} = this.state;
		const addVal = moveForward ? 1 : -1;
		const nextIndex = activeIndex + addVal

		this.setState({
			activeIndex: nextIndex,
			moveForward: nextIndex + addVal < 0 || nextIndex + addVal >= days.length
				? !moveForward
				: moveForward
		});
	}

	render () {
		const { className, forecast } = this.props;
		const { activeIndex, days } = this.state;
		return (
			<div className={`component-five-day-forecast ${className} active-${activeIndex}`}>
				{days.map((day, i) => {
						return (
							<div key={day.dt} className={`forecast-day ${activeIndex === i ? 'active' : ''}`}>
								<h2 className="forecast-day__day">
									{day.dayOfWeek}
								</h2>
								<div className="forecast-day__icon neon">
									<WeatherIcon
										size={50}
										weather={day}
									/>
								</div>
								<div className="forecast-day__temp">
									<span className="forecast-day__temp-min">{tempFormat(day.temp_min)} &nbsp;</span>
									<span className="forecast-day__temp-max">{tempFormat(day.temp_max)}</span>
								</div>
							</div>);
					}
				)}
			</div>
		);
	}
}

export default FiveDayForecast;

function getDaysFromForecast (forecast = {}) {
	const allDays = get(forecast, 'list', []);
	const days = allDays.reduce((days, day) => {
		const dateObj = new Date(day.dt * 1000);
		const dt = dateObj.getDate();
		const dayVals = days[ dt ] || { temp_min: 200, temp_max: 0 };

		return {
			...days,
			[ dt ]: {
				...day,
				dt_txt: dateObj.toDateString(),
				dayOfWeek: abbreviated_days[ dateObj.getDay() ],
				weather: day.weather,
				temp_min: Math.min(dayVals.temp_min, day.main.temp_min),
				temp_max: Math.max(dayVals.temp_max, day.main.temp_max),
			}
		};
	}, {});
	return Object.values(days);
}
