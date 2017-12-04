import React, {Component} from 'react';
import './App.css';

// Components
import ClockWidget from './components/Clock-widget';
import CalendarWidget from './components/Calendar-widget';
import WeatherWidget from './components/Weather-widget';

class App extends Component {
	state = {
		date: new Date(),
		coordinates: {}
	}

	componentDidMount () {
		setInterval(this.refreshData, 60 * 1000); // update the time and weather every min
		setInterval(this.refreshPage, 60 * 60 * 1000); // hourly hard page refresh
		this.refreshData();
	}

	refreshData = () => {
		this.getLocation();
		this.refreshClock();
	}

	refreshClock = () => this.setState({ date: new Date() });

	render () {
		const { date, coordinates } = this.state;
		return (
			<div className="App">
				<ClockWidget
					className="neon"
					date={date}/>
				<CalendarWidget
					date={date}/>
				<WeatherWidget
					coordinates={coordinates}
				/>
			</div>
		);
	}

	getLocation = () => ("geolocation" in navigator) &&
		navigator.geolocation.getCurrentPosition(position => this.setState({ coordinates: position.coords }), (error) => {});

	refreshPage = () => window.location.reload();
}

export default App;
