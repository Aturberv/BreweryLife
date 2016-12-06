import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import BreweryImages from './BreweryImages';
import BrewTabs from './BreweryPageTabs';

const BreweryPage = ({
    brewery,
    toggle,
    isShowing
}) => {
    return (
        <Modal show={isShowing}
               onHide={toggle}
               dialogClassName="extra-wide-modal">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">{brewery.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BrewTabs brewery={brewery} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggle}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BreweryPage;


