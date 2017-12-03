import React from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash';
import {abbreviated_days} from 'date-names'
import WeatherIcon from '../Weather-icon';
import tempFormat from '../../helpers/tempFormat';

function FiveDayForecast ({ className, forecast }) {
	const days = getDaysFromForecast(forecast);
	return (
		<div className={`component-five-day-forecast ${className}`}>
			{days.map(day => {
				console.log('FiveDayForecast - day', day);
				return (
					<div key={day.dt} className="forecast-day">
						<div className="forecast-day__day">
							{day.dayOfWeek}
						</div>
						<div className="forecast-day__icon">
							<WeatherIcon
								size={50}
								weather={get(day, 'weather[0]')}
							/>
						</div>
						<div className="forecast-day__temp">
							{tempFormat(day.temp_min)}
						</div>
						<div className="forecast-day__temp">
							{tempFormat(day.temp_max)}
						</div>
					</div>);
				}
			)}
		</div>
	);
}

FiveDayForecast.propTypes = {
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

FiveDayForecast.defaultProps = {
	className: ''
};

export default FiveDayForecast;

function getDaysFromForecast (forecast) {
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
