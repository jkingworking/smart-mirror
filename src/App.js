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
		this.refreshData();

		setInterval(this.refreshClock, 30 * 1000); // update the time every 30 sec
		setInterval(this.refreshData, 2 * 60 * 1000); // update the weather every 2 min
	}

	refreshData = () => {
		this.getLocation();
		this.refreshClock();
	}

	refreshClock = () => this.setState({ date: new Date() });

	render () {
		const { date, coordinates } = this.state;
		return (
			<div className="App" onClick={this.goFullScreen}>
				<ClockWidget
					className="app-widget neon"
					date={date}/>
				{/*<CalendarWidget*/}
					{/*className="sub-widget"*/}
					{/*date={date}/>*/}
				<WeatherWidget
					className="sub-widget"
					coordinates={coordinates}
				/>
			</div>
		);
	}

	getLocation = () => ("geolocation" in navigator) &&
		navigator.geolocation.getCurrentPosition(position => this.setState({ coordinates: position.coords }), (error) => {});
}

export default App;
