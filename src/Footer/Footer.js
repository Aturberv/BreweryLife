import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import './Footer.css';

const Footer = ({
    allCities,
    router
}) => {

    return (
        <footer>
            <Row className="footer">
                <Col xs={12} sm={4}>
                    <Link to="/nyc/BreweryMap">About Us</Link>
                </Col>
                <Col xs={12} sm={4}>
                    <Menu mode="horizontal" onClick={({key}) => router.push(`/${key}`) }>
                        <Menu.SubMenu title={<span>Check out our other cities <Icon type="up" /></span>}>
                        {
                            Object.keys(allCities).map((city) =>
                                <Menu.Item key={city}>
                                    {allCities[city].name}
                                </Menu.Item>
                            )
                        }
                        </Menu.SubMenu>
                    </Menu>
                </Col>
                <Col xs={12} sm={4}>
                    <a href="https://github.com/Aturberv/NYCBeerMap" target="_blank">Help us make this better!</a>
                </Col>
            </Row>
                        
        </footer>
    );
}

export default Footer;