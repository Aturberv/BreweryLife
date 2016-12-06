import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BreweryImages from './BreweryImages';

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
            <div>
              {brewery.description}
            </div>
            <div>
                <BreweryImages brewery={brewery} />
            </div>
            <div>
              {
                brewery.reviews.map((review, idx) =>
                  <div key={`${brewery.name}${idx}`}>
                    <p>{ review.rating } / 5</p>
                    <p>{ review.text }</p>
                  </div>
                )
              }
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggle}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BreweryPage;


