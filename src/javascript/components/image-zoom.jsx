import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/image-zoom.css'; 

const ImageZoom = ({ src }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <>
            <img
                src={src}
                className="thumbnail"
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
            />
            <Modal
                show={showModal}
                onHide={handleClose}
                size="lg"
                centered
                className="modal-container"
            >
                <Modal.Body className="p-0">
                    <img src={src} className="modal-image" />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImageZoom;
