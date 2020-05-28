import React, { Component } from 'react';
import { Col, Card, ProgressBar } from 'react-bootstrap';
import { Badge } from 'reactstrap';
class Planets extends Component {
    render(props) {
        return (
            <Col md={12} key={this.key}>
                <Card className="text-left">
                    <Card.Header>
                        <Card.Text id="planetName"><span>{this.props.name}</span>Planet</Card.Text>
                        <Card.Text id="population"><span>{this.props.population}</span>Population</Card.Text>
                    </Card.Header>
                    <div className="prog">
                        <ProgressBar variant="success" now={this.props.percentage} />
                    </div>
                    <Card.Body>
                        <ul id="planetsDetails">
                            <li><span><span id="rotation_period">{this.props.rotation_period}</span>Rotation Period</span></li>
                            <li><span><span id="orbital_period">{this.props.orbital_period}</span>Orbital Period</span></li>
                            <li><span><span id="diameter">{this.props.diameter}</span>Diameter</span></li>
                            <li><span><span id="surface_water">{this.props.surface_water}</span>Surface Water</span></li>
                        </ul>
                        <ul id="peopleOnPlanets">
                            {this.props.residents}
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <Badge color="success" id="climate" pill>Climate: {this.props.climate}</Badge>
                        <Badge color="success" id="gravity" pill>Gravity: {this.props.gravity}</Badge>
                        <Badge color="success" id="terrain" pill>Terrain: {this.props.terrain}</Badge>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}
export default Planets;
