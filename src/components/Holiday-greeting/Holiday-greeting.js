import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {last} from 'lodash';

class HolidayGreeting extends Component {
	constructor (props, context) {
		super();
		this.state = {
			holidays:[]
		};
	}

	static propTypes = {
		date: PropTypes.instanceOf(Date).isRequired,
		className: PropTypes.string
	};

	static contextTypes = {};

	static defaultProps = {
		className: ''
	};

	componentDidMount() {
		this.updateHolidays(this.props.date);
	}

	componentWillReceiveProps({date}) {
		this.updateHolidays(date);
	}

	render () {
		const {className, date} = this.props;
		const {holidays} = this.state;

		return (
			<div className={`component-holiday-greeting ${className}`} >
				{holidays.map(holiday => Number(last(holiday.observed.split('-'))) === date.getDate() + 1
					? (
						<h3 key={holiday.name} >{randomGreeting()} {holiday.name}</h3>
					)
					: null
				)}
			</div>
		);
	};

	updateHolidays = async (date) => {
		const holidays = await this.getHolidays(date);
		this.setState({holidays});
	}

	getHolidays = async (today) => {
		const urlPrarms = {
			key: '2d3f58a3-5d6f-4aec-b3fa-ab9530395881',
			// key: 'c3cf9eaa-4f05-4b44-a633-c309d5839010',
			country: 'US',
			public: 'true',
			year: today.getFullYear() - 1,
			month: today.getMonth() + 1,
		};

		const storedData = this.getStoredData(urlPrarms.year, urlPrarms.month);
		return storedData
			? storedData
			: this.fetchHolidays(urlPrarms);
	}

	fetchHolidays = async (urlPrarms) => {
		const holidayRequest = await fetch(`https://holidayapi.com/v1/holidays?${Object.entries(urlPrarms).map(([k,v])=>`${k}=${v}`).join('&')}`, {
			method: 'GET'
		});

		const holidayData = await holidayRequest.json();
		const holidayList = holidayData.holidays;

		this.setStoredData(urlPrarms.year, urlPrarms.month, holidayList);
		return holidayList;
	}

	getStoredData = (year, month) => {
		const storedData = window.localStorage.getItem(`${year}-${month}`);
		return storedData
			? JSON.parse(storedData)
			: null;
	}

	setStoredData = (year, month, data) => {
		window.localStorage.setItem(`${year}-${month}`, JSON.stringify(data));
	}
}

function randomGreeting() {
    return 'Happy'
}

export default HolidayGreeting;
