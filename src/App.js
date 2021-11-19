import React, { useEffect, useState } from "react";
import "./App.css";

import Event from "./components/EventHandler/Event";

function App() {
	const [hours, sethours] = useState([]);
	const [week, setWeek] = useState([]);
	const [monthYear, setmonthYear] = useState([]);
	const [weekCounter, setWeekCounter] = useState(0);
	const [eventList, setEventList] = useState([
		{
			id: "15-Monday-00-00-0",
			eventName: "testing event",
			eventDuration: 15,
		},
		{
			id: "16-Tuesday-00-00-0",
			eventName: "testing event 2",
			eventDuration: 30,
		},
	]);

	// Create Timestamp
	useEffect(() => {
		let minutes = ["00", 15, 30, 45];

		for (let i = 0; i <= 23; i++) {
			let h = i < 10 ? `0${i}` : i;

			for (let j = 0; j < 4; j++) {
				sethours((prevState) => [...prevState, `${h}:${minutes[j]}`]);
			}
		}
	}, []);

	// Set Week
	useEffect(() => {
		const weekHandler = () => {
			let date = new Date();
			let firstDay = date.getDate() - date.getDay() - 1;

			date.setDate(date.getDate(firstDay) + weekCounter);

			setmonthYear(
				date.toLocaleDateString(window.navigator.language, {
					month: "long",
					year: "numeric",
				})
			);

			for (let i = 1; i <= 7; i++) {
				let first = date.getDate() - date.getDay() + i;

				let days = new Date(date.setDate(first)).toLocaleDateString(
					window.navigator.language,
					{
						weekday: "long",
						day: "numeric",
					}
				);

				setWeek((prevWeek) => [...prevWeek, days]);
			}
		};

		setWeek([]);
		weekHandler();

		console.log(1);
	}, [weekCounter]);

	// Next Week
	const nextWeekHandler = () => {
		setWeekCounter((prev) => prev + 7);
	};

	// Prev Week
	const prevWeekHandler = () => {
		setWeekCounter((prev) => prev - 7);
	};

	return (
		<div className="calendar">
			<div className="d-flex justify-content-between align-items-center mb-2 mt-2">
				<button
					className="btn btn-dark btn-sm"
					onClick={prevWeekHandler}
				>
					Prev Week
				</button>
				<p className="mb-0">{monthYear}</p>
				<button
					className="btn btn-dark btn-sm"
					onClick={nextWeekHandler}
				>
					Next Week
				</button>
			</div>

			<div className="calendar-dates">
				<div className="timeline-column">
					<p className="timeline-column__header">Time</p>
					{hours.slice(0, 4).map((d, i) => (
						<div key={i} className="timeline-column">
							<p className="timeline-column__header">{d}</p>
						</div>
					))}
				</div>
				{week.map((d, i) => (
					<div key={i} className="timeline-column">
						<p className="timeline-column__header">{d}</p>
						<Event
							eventList={eventList}
							setEventList={setEventList}
							hours={hours}
							day={d}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
