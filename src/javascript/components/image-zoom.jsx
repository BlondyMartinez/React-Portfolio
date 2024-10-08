import React, { useState } from 'react';
import { Modal, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/image-zoom.css'; 
import useScreenWidth from '../hooks/useScreenWidth';

const ImageZoom = ({ src, label }) => {
    const [showModal, setShowModal] = useState(false);
    const smallDevice = useScreenWidth();

    const handleShow = () => { if(!smallDevice) setShowModal(true) };
    const handleClose = () => setShowModal(false);

    return (
        <>
            <div className="position-relative d-inline-block">
                <img
                    src={src}
                    className="thumbnail"
                    onClick={handleShow}
                    style={{ cursor: 'pointer' }}
                />
                {label && (
                    <Badge 
                        bg="dark" 
                        className="position-absolute top-0 start-0 m-2 text-white"
                    >
                        {label}
                    </Badge>
                )}
            </div>

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
