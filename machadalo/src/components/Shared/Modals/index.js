import React from 'react';
import { Modal } from 'react-bootstrap';


const ModalForms = ({ show, handleClose, modalHeader, modalBody }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose} className="wpModal">
				<Modal.Header closeButton>
					<Modal.Title>{modalHeader}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>{modalBody}</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ModalForms;
