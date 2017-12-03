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
		setInterval(this.refreshData, 60 * 1000);
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
				<div className="column-left">
					<ClockWidget
						className="neon"
						date={date}/>
					<CalendarWidget
						date={date}/>
				</div>
				<div className="column-right">
					<WeatherWidget
						coordinates={coordinates}
					/>
				</div>
			</div>
		);
	}

	getLocation = () => ("geolocation" in navigator) &&
		navigator.geolocation.getCurrentPosition(position => this.setState({ coordinates: position.coords }), (error) => {});
}

export default App;
