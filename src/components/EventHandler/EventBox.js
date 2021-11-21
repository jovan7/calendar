import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Components
import EventLogic from "./EventLogic";

const EventBox = ({ savenEvent, eventList, setEventList, id }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	let eventAdded = eventList.find((e) => e.id === id);
	// Add Events
	const saveEvent = (e) => {
		e.preventDefault();
		const form = e.target;

		setEventList((prev) => [
			...prev,
			{
				id: id,
				eventName: form.eventName.value,
				eventDuration: 1,
			},
		]);
		handleClose();
	};

	const eventDragOverHandler = (e) => {
		e.preventDefault();
	};

	const eventDropHandler = (e) => {
		const eventDragId =
			document.querySelector(".dragging").parentElement.id;
		const newEventId = e.target.parentElement.parentElement.id;
		const eventListClone = [...eventList];

		if (newEventId) {
			for (let i = 0; i < eventListClone.length; i++) {
				if (eventListClone[i].id === eventDragId) {
					eventListClone[i].id = newEventId;
				}
			}
		}

		setEventList(eventListClone);
	};

	return (
		<>
			{eventAdded ? (
				<EventLogic
					eventAdded={eventAdded}
					eventList={eventList}
					setEventList={setEventList}
					id={id}
				/>
			) : (
				<div
					onDragOver={eventDragOverHandler}
					onDrop={eventDropHandler}
				>
					<button
						className="btn btn-dark btn-sm"
						onClick={handleShow}
					>
						add
					</button>
				</div>
			)}

			<Modal
				show={show}
				onHide={handleClose}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="deletePopUp-modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>Add New Event</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={saveEvent}>
						<Form.Group className="mb-3" controlId="formEventName">
							<Form.Label>
								Please insert event name that you want to add
							</Form.Label>
							<Form.Control
								type="text"
								name="eventName"
								placeholder="Event Name"
								maxLength="24"
								required
							/>
						</Form.Group>
						{/* <Form.Group className="mb-3">
							<Form.Label>
								Duration (if not specified will be set to 15min)
							</Form.Label>
							<Form.Control
								name="eventDuration"
								type="number"
								min="15"
								max="60"
								step="15"
							/>
						</Form.Group> */}
						<Form.Group className="d-flex justify-content-around">
							<Button
								type="submit"
								className="custom-btn btn-primary"
							>
								Save
							</Button>
							<Button
								className="custom-btn btn-secondary"
								onClick={handleClose}
							>
								Close
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EventBox;
