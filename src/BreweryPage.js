import React from 'react';
import BreweryImages from './BreweryImages';
import BreweryReviews from './BreweryReviews';
import BreweryDescription from './BreweryDescription';
import BreweryBeers from './BreweryBeers';
import BrewerySocial from './BrewerySocial';
// import BreweryMenu from './BreweryMenu'; for future implementation
import RideButton from './RideButton';
import Tabs from 'antd/lib/tabs';
import Helmet from 'react-helmet';
import 'antd/lib/tabs/style/css';

import './BreweryPage.css';

const BreweryPage = (
{
    brewery, 
    userCoordinates,
    isMobile
}) => {
    return (
      <div className="breweryPage">
          <Helmet 
              title={ brewery.name }
            />
            <div className="breweryPage-header">
                <h2 className="brewery-name">{brewery.name}</h2>
                <center>
                    <BrewerySocial social={brewery.social} />
                </center>
            </div>
            <RideButton breweryName={brewery.name} 
                        userCoordinates={userCoordinates}
                        isMobile={isMobile}
                        destination={brewery.location}/>
            <div className="breweryPage-tabs">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane key="1" tab="About">
                        <BreweryDescription description={brewery.description} />
                        <BreweryImages brewery={brewery} />
                        <center><script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=31a89591-e2e0-4a99-9e83-e873cab052a9&storeId=nycbrewerymap-20"></script></center>
                    <div className="review-menu-container">
                        <BreweryReviews brewery={brewery} />
                    </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab="Beers">
                        <BreweryBeers brewery={brewery} />
                        <center><script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=31a89591-e2e0-4a99-9e83-e873cab052a9&storeId=nycbrewerymap-20"></script></center>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default BreweryPage;


