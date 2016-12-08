import React from 'react';
//import { Tabs, Tab } from 'react-bootstrap';
import BreweryImages from './BreweryImages';
import BreweryReviews from './BreweryReviews';
import BreweryDescription from './BreweryDescription';
import BreweryEvents from './BreweryEvents';
import BreweryBeers from './BreweryBeers';

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';

import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';

import './BrewModal.css';

const BreweryPage = ({
    brewery,
    toggle,
    isShowing
}) => {
    return (
        <Modal visible={isShowing}
               onCancel={toggle}
               closable
               width="100%"
               title={
                <p>{brewery.name}</p>
               }
               footer={
                ''
               }
               >
                <Tabs defaultActiveKey="1" id="brew-tabs">
                    <Tabs.TabPane key="1" tab="About">
                        <BreweryDescription brewery={brewery} />
                        <BreweryImages brewery={brewery} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab="Beers">
                        <BreweryBeers brewery={brewery} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="3" tab="Reviews">
                        <BreweryReviews brewery={brewery} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="4" tab="Events">
                        <BreweryEvents brewery={brewery} />
                    </Tabs.TabPane>
                </Tabs>
        </Modal>
    );
}

export default BreweryPage;


