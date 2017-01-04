import React from 'react';
import BreweryImages from '../BreweryImages/BreweryImages';
import BreweryReviews from '../BreweryReviews/BreweryReviews';
import BreweryDescription from '../BreweryDescription/BreweryDescription';
import BreweryBeers from '../BreweryBeers/BreweryBeers';
import BrewerySocial from '../BrewerySocial/BrewerySocial';
import BreweryRating from '../BreweryRating/BreweryRating';
import RideButton from '../RideButton/RideButton';
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
              meta={[
                {name:"description", content:brewery.breweryDescription}
              ]}
            />
            <div className="breweryPage-header">
                <h2 className="brewery-name">{brewery.name}</h2>
                <center>
                    <BrewerySocial social={brewery.social} />
                    <BreweryRating brewery={brewery} />
                </center>
            </div>
            <RideButton breweryName={brewery.name} 
                        userCoordinates={userCoordinates}
                        isMobile={isMobile}
                        destination={brewery.location}/>
            <div className="breweryPage-tabs">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane key="1" tab="About">
                        <BreweryDescription description={brewery.breweryDescription} />
                        <BreweryImages photos={brewery.photos} />
                        <BreweryReviews reviews={brewery.reviews} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab="Beers">
                        <BreweryBeers beers={brewery.beers} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default BreweryPage;


