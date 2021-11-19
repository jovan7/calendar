import React, { useState } from "react";

import { FaRegWindowClose, FaEdit, FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlineDragHandle } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";

const EventLogic = ({ eventList, setEventList, eventAdded, id }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [eventDragStart, setEventDragStart] = useState(false);

	// Modal Visibility Handlers
	const closeEditModalHandler = () => setShowEditModal(false);
	const showEditModalHandler = () => setShowEditModal(true);

	// Rename Event
	const saveEditEvent = (e) => {
		e.preventDefault();
		let newEventName = e.target.editEventName.value;

		eventAdded.eventName = newEventName;
		closeEditModalHandler();
	};

	// Remove Event
	const removeEventHandler = () => {
		let eventRemoved = eventList.filter((i) => i.id !== id);

		setEventList(eventRemoved);
	};

	// Drag Handlers
	const eventDragStartHandler = () => {
		setEventDragStart(true);
	};

	const eventDragStopHandler = () => {
		setEventDragStart(false);
	};

	const resizeHandler = (e) => {
		console.log(e);
	};

	return (
		<>
			<div
				className={`h-${eventAdded.eventDuration} event-active ${
					eventDragStart ? "dragging" : ""
				}`}
				onDragStart={eventDragStartHandler}
				onDragEnd={eventDragStopHandler}
				onChange={resizeHandler}
			>
				<div draggable="true">
					<div
						className="p-1 d-flex align-items-center justify-content-between"
						draggable="true"
					>
						<FaEdit
							onClick={showEditModalHandler}
							className="edit-event"
						/>
						<MdOutlineDragHandle />
						<FaRegWindowClose
							className="remove-event"
							onClick={removeEventHandler}
						/>
					</div>
					<span>{eventAdded.eventName}</span>
				</div>
				<div className="duration-controls p-1 d-flex align-items-center justify-content-between">
					<FaPlus />
					<FaMinus />
				</div>
			</div>
			<Modal
				show={showEditModal}
				onHide={closeEditModalHandler}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="deletePopUp-modal"
			>
				<Modal.Body className="text-center">
					<Form onSubmit={saveEditEvent}>
						<Form.Group className="mb-3">
							<Form.Label>
								Please insert new name for the event
							</Form.Label>
							<Form.Control
								type="text"
								name="editEventName"
								placeholder="New Name"
								maxLength="24"
								required
							/>
						</Form.Group>
						<Form.Group className="d-flex justify-content-around">
							<Button type="submit" className="btn btn-primary">
								Save
							</Button>
							<Button
								className="btn btn-secondary"
								onClick={closeEditModalHandler}
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

export default EventLogic;
