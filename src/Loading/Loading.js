import React, { Component } from 'react';
import { Col, Card } from 'react-bootstrap';
import { Badge } from 'reactstrap';

class Loading extends Component {

    render(props) {
        return (
            <Col className="loading_heatMap" md={12} key={this.key}>
                <Card className="text-left">
                    <Card.Header>
                        <Card.Text id="planetName"><span></span>Planet</Card.Text>
                        <Card.Text id="population"><span></span>Population</Card.Text>
                    </Card.Header>
                    <div className="prog">
                        <span></span>
                    </div>
                    <Card.Body>
                        <ul id="planetsDetails">
                            <li><span><span id="rotation_period"></span>Rotation Period</span></li>
                            <li><span><span id="orbital_period"></span>Orbital Period</span></li>
                            <li><span><span id="diameter"></span>Diameter</span></li>
                            <li><span><span id="surface_water"></span>Surface Water</span></li>
                        </ul>
                        <ul id="planetsDetails">
                            <li><span><span id="rotation_period"></span>Rotation Period</span></li>
                            <li><span><span id="orbital_period"></span>Orbital Period</span></li>
                            <li><span><span id="diameter"></span>Diameter</span></li>
                            <li><span><span id="surface_water"></span>Surface Water</span></li>
                        </ul>
                        <ul id="peopleOnPlanets">
                            <li>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                            </li>
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <Badge color="success" id="climate" pill>Climate: </Badge>
                        <Badge color="success" id="gravity" pill>Gravity: </Badge>
                        <Badge color="success" id="terrain" pill>Terrain: </Badge>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}
export default Loading;
