import React, { useState, useRef, useEffect } from "react";

import { FaRegWindowClose, FaEdit } from "react-icons/fa";
import { MdOutlineDragHandle } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";

const EventLogic = ({ eventList, setEventList, eventAdded, id }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [eventDragStart, setEventDragStart] = useState(false);
	const eventActiveRef = useRef(null);

	// Resize handler
	useEffect(() => {
		const resize_ob = new ResizeObserver(function (e) {
			let element = e[0].contentRect;
			let eventHeightFixed = Math.ceil(element.height / 50);
			if (eventHeightFixed > 4) {
				eventAdded.eventDuration = 4;
				return;
			}

			if (eventHeightFixed) {
				eventAdded.eventDuration = eventHeightFixed;
			}
		});

		resize_ob.observe(eventActiveRef.current);
	}, []);

	const applyEventDurationHandler = (e) => {
		setEventList([...eventList]);
		e.target.removeAttribute("style");
	};

	// Modal Visibility Handlers
	const closeEditModalHandler = () => setShowEditModal(false);
	const showEditModalHandler = () => setShowEditModal(true);

	// Rename Event
	const saveEditEvent = (e) => {
		e.preventDefault();
		let newEventName = e.target.editEventName.value;

		if (newEventName) eventAdded.eventName = newEventName;
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

	return (
		<>
			<div
				ref={eventActiveRef}
				className={`h-${eventAdded.eventDuration} event-active ${
					eventDragStart ? "dragging" : ""
				}`}
				onDragStart={eventDragStartHandler}
				onDragEnd={eventDragStopHandler}
				onMouseUp={applyEventDurationHandler}
				draggable="true"
			>
				<div ref={eventActiveRef} className="resize-mask"></div>
				<div>
					<div className="p-1 d-flex align-items-center justify-content-between">
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
			</div>
			<Modal
				show={showEditModal}
				onHide={closeEditModalHandler}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="deletePopUp-modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit duration or event name</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
						{/* <Form.Group className="mb-3">
							<Form.Label>Update duration time</Form.Label>
							<Form.Control
								name="editEventDuration"
								type="number"
								min="15"
								max="60"
								step="15"
							/>
						</Form.Group> */}
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
