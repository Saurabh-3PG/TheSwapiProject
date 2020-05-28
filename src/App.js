import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';
import logo from './picture/logo.png';
import Userpage from './Userpage/Userpage';
import Loginpage from './Loginpage/Loginpage';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peoples: [],
      currentUserDetails:"",
      username: "",
      password: "",
      currentUserP:"",
      user: false
    };
  }
  componentDidMount() {
    this.setState({
      user: localStorage.getItem('person') !== null || undefined || ''
    });
  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  logOut = event => {
    event.preventDefault();
    localStorage.clear();
    this.setState({
      user: false
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    let currentUser = this.state.username;
    let currentUserPsw = this.state.password;
    axios.get(`https://swapi.dev/api/people/?search=${currentUser}`)
      .then(
        result => {
          let userDetail = result.data.results;
          //console.log(currentUser, userDetail, userDetail[0].birth_year);
          if (currentUserPsw === userDetail[0].birth_year) {
            localStorage.setItem( 'person', currentUser);
            localStorage.setItem('personPsw', currentUserPsw);
            this.setState({
              user: true
            });
          }
        }
    )
  }
  render() {
    let Userpages;
    let logIn;
    if (this.state.user) {
      Userpages = <Userpage logOut={this.logOut} userrr={localStorage.getItem('person')}/>;
      logIn = null;
    }
    else{
      Userpages = null;
      logIn = <Loginpage handleChange={this.handleChange} handleSubmit={this.handleSubmit} username={this.state.username} password={this.state.password} />;
    }
    return (
      <Container id="main">
        <header>
          <Row>
            <Col md={1}>
              <img src={logo} alt="logo" />
            </Col>
          </Row>
        </header>
        <main>
          {logIn}
          {Userpages}
        </main>
      </Container>
    );
  }
}

export default App;
