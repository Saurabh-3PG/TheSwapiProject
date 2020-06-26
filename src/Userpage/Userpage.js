import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import search from '../picture/search.png';
import residents from '../picture/residents.jpg';
import Planets from '../Planets/Planets';
import Loading from '../Loading/Loading';
// import SearchResults from 'react-filter-search';
class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginTm: new Date().toLocaleString(),
            startTime: 0,
            lastSearchTm: 0,
            next: null,
            prev: null,
            planets: [],
            name: [],
            value: '',
            posts: [],
            timeLog: [],
            isLoading: true,
            errors: null,
            count: []
        };
    }
    apiCall(url) {
        axios.get(url)
            .then(
                result => {
                    this.setState({
                        planets: result.data.results,
                        name: result.data.results.name,
                        next: result.data.next,
                        prev: result.data.previous,
                        isLoading: false
                    });
                }
            ).catch(err => {
              this.setState({
                isLoading: true
              })
              console.log(`${err} whilst contacting the quote API.`)
            })
    }
    componentDidMount() {
        this.apiCall("https://swapi.dev/api/planets/?search=");
    }
    preventdefaults = event => {
        event.preventDefault();
    }
    handleChange = event => {
        event.preventDefault();
        const { value } = event.target; //or const value = event.target.value is same
        let valLengrh = value.length;
        // let curTime;
        if (valLengrh === undefined || valLengrh === 0 || valLengrh === null){
            let searchURL = "https://swapi.dev/api/planets/?search=";
            this.apiCall(searchURL)
        }
        else if (valLengrh > 3){
            if (localStorage.getItem('person') === 'Luke Skywalker') {
                let searchURL = "https://swapi.dev/api/planets/?search=" + value;
                this.apiCall(searchURL);
                console.log('Luke')
            }
            else {
                let ct = this.state.count;
                let c = this.state.count.length;
                ct.push(c++)
                let newCt = ct
                this.setState({
                    count: newCt
                }, function () {
                        this.state.timeLog.push(new Date().getTime())
                        let lastElm = this.state.timeLog.length - 1;
                        let currentTime = this.state.timeLog[lastElm];
                        let inSec = (currentTime - this.state.timeLog[0]) / 1000
                        console.log('not Luke', c)
                        if (this.state.count.length <= 5) {
                            let searchURL = "https://swapi.dev/api/planets/?search=" + value;
                            this.apiCall(searchURL);
                            console.log('inSec <= 60 && c <= 5 || inSec > 60 && c <= 5', inSec)
                            if (inSec > 60 && this.state.count.length === 5){
                                this.state.timeLog.shift();
                                this.state.count.shift();
                            }
                        }
                        else if (this.state.count.length > 5) {
                            this.state.timeLog.shift();
                            this.state.count.shift();
                            if ( inSec <= 60 ){
                                alert('you are not allowed');
                                console.log(this.state.count.length, inSec, 'you are not allowed')
                            }
                            else if (inSec > 60){
                                console.log(this.state.count.length, inSec, 'you are allowed but something is fucked up!')
                                let searchURL = "https://swapi.dev/api/planets/?search=" + value;
                                this.apiCall(searchURL);
                            }
                        }
                    });
            }
                    // console.log(
                    //     'count:', this.state.count, c,
                    //     'valLengrh', valLengrh, 'timeLog:',
                    //     this.state.timeLog, 'currentTime:', currentTime,
                    //     'first:', this.state.timeLog[0], 'inSec:', inSec
                    // );
                    // if ((c <= 5) || (inSec < 60 && c > 5 && localStorage.getItem('person') === 'Luke Skywalker')) {
                    //     // if (c > 0) {
                    //         let searchURL = "https://swapi.dev/api/planets/?search=" + value;
                    //         this.apiCall(searchURL);
                    //         console.log(searchURL)
                    //     // }
                    // }
                // console.log(timeLog)
            // if (c === 1) {
            //     this.setState({
            //         startTime: new Date().getTime()
            //     });
            // }
            // curTime = new Date().getTime();
            // let startTime = this.state.startTime;
            // let diffInSec = (curTime - startTime) / 1000
            // console.log(diffInSec);
            // if (c > 5 && localStorage.getItem('person') !== 'Luke Skywalker'){
               
            // }
            // let searchURL = "https://swapi.dev/api/planets/?search=" + value;
            // this.apiCall(searchURL);
        }
        this.setState({
            value: value
        });
        // console.log(value, c);
        // if (this.state.count < 5){
        //     event.preventDefault();
        //     const { value } = event.target;
        //     this.setState({
        //         value
        //     });
        //     const searchURL = "https://swapi.dev/api/planets/?search=" + value;
        //     this.apiCall(searchURL)
        // }
        // else if (this.state.count >= 5 && localStorage.getItem('person') === 'Luke Skywalker'){
        //     console.log(this.state.count,'count')
        //     event.preventDefault();
        //     const { value } = event.target;
        //     this.setState({
        //         value
        //     });
        //     const searchURL = "https://swapi.dev/api/planets/?search=" + value;
        //     this.apiCall(searchURL)
        // }
        // console.log(this.state.curTime)
    };

    render(props) {
        const { planets, value, next, isLoading } = this.state;
        let noOfPeople = [];
        return (
            <Row id="userpage" className="justify-content-center">
                <Col md={10}>
                    <Row id="search">
                        <Col md={12}>
                            {/* <Form className="search-form"> */}
                            <Form.Group controlId="formBasicSearch">
                                <Form.Label>Search</Form.Label>
                                <Form.Control type="text" placeholder="Search For Planets" value={value}
                                    onChange={this.handleChange} autoComplete="off" />
                            </Form.Group>
                            <Button className="search-button" onClick={this.preventdefaults}>
                                <img src={search} alt="" />
                            </Button>
                            {/* </Form> */}
                        </Col>
                    </Row>
                    <Row id="result">
                      {
                        isLoading ? <Loading /> : planets.map(el => {
                                    let currentValue
                                    if ((el.population !== 'unknown')){
                                        noOfPeople.push(el.population)
                                        currentValue = el.population;
                                    }
                                    else{
                                        noOfPeople.push(0)
                                        currentValue = 0; 
                                    }
                                    let maxValue = Math.max(...noOfPeople);
                                    let percentage = (currentValue / maxValue) * 100;
                                    //console.log(percentage,currentValue, maxValue, noOfPeople)
                                    return (
                                        <Planets
                                            key={el.name}
                                            name={el.name}
                                            population={el.population}
                                            rotation_period={el.rotation_period}
                                            orbital_period={el.orbital_period}
                                            diameter={el.diameter}
                                            surface_water={el.surface_water}
                                            climate={el.climate}
                                            gravity={el.gravity}
                                            terrain={el.terrain}
                                            percentage={percentage}
                                            residents={
                                                el.residents.map((resident, index) => (
                                                    <li className="people" key={index}>
                                                        <a href={resident} target="blank" data-residents-id={index}>
                                                            <img src={residents} alt="resident" />
                                                        </a>
                                                    </li>
                                                ))}
                                        />
                                    )
                                })
                      }
                    </Row>
                    <Row>
                        <div className="nextButton" data-active={this.state.next !== null} onClick={()=>this.apiCall(next)}>Next</div>
                    </Row>
                    <p>
                        Welcome {this.props.userrr}!
                    </p>
                    <p className="logout-button" onClick={this.props.logOut}>LogOut</p>
                </Col>
            </Row>
        );
    }
}
export default Userpage;
