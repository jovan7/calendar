import React from "react";

// Components
import EventBox from "./EventBox";

const Event = ({ columnCounter, eventList, setEventList, hours, day }) => {
	return (
		<>
			{hours.slice(0, columnCounter).map((t, i) => (
				<div
					key={i}
					className="timeline-box"
					id={`${day}-${t}-${i}`.replace(/[^A-Z0-9]/gi, "-")}
				>
					<EventBox
						eventList={eventList}
						setEventList={setEventList}
						time={t}
						id={`${day}-${t}-${i}`.replace(/[^A-Z0-9]/gi, "-")}
					/>
				</div>
			))}
		</>
	);
};

export default Event;
