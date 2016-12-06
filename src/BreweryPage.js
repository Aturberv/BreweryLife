import React from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import BreweryImages from './BreweryImages';
import BreweryReviews from './BreweryReviews';
import BreweryDescription from './BreweryDescription';
import BreweryEvents from './BreweryEvents';
import BreweryBeers from './BreweryBeers';
import './BrewModal.css';

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
                <Tabs defaultActiveKey={1} id="brew-tabs">
                    <Tab eventKey={1} title="About">
                        <BreweryDescription brewery={brewery} />
                        <BreweryImages brewery={brewery} />
                    </Tab>
                    <Tab eventKey={2} title="Beers">
                        <BreweryBeers brewery={brewery} />
                    </Tab>
                    <Tab eventKey={3} title="Reviews">
                        <BreweryReviews brewery={brewery} />
                    </Tab>
                    <Tab eventKey={4} title="Events">
                        <BreweryEvents brewery={brewery} />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggle}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BreweryPage;


