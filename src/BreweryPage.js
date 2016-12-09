import React from 'react';
import BreweryImages from './BreweryImages';
import BreweryReviews from './BreweryReviews';
import BreweryDescription from './BreweryDescription';
import BreweryEvents from './BreweryEvents';
import BreweryBeers from './BreweryBeers';

import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';

import './BrewModal.css';

const BreweryPage = ({
    brewery,
    closeBrewery,
}) => {
    return (
        <div>
        <span onClick={closeBrewery}>{brewery.name}</span>
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
        </div>
    );
}

export default BreweryPage;


