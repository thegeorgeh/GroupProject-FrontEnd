import React, { Component } from 'react';
import './App.css';
import LogIn from './LogIn';
import TrainerPage from './TrainerPage';
import AdminPage from './AdminPage';
import Axios from 'axios';
import * as constants from './Constants.js';
import logo from './QA-Consulting-Logo.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { route: "login", user: "", id: "" };
  }
  handleLogin = (username, password1) => {
      let body = { email: username, password: password1 };
      let self = this;
      Axios.put(constants.LOGIN_URL, body).then(function (response) {
        console.log(response);
        if (username === response.data.email) {
          if(response.data.admin===true){
            self.setState({ route:"admin", user: response.data.email, id: response.data.id});
          }else{
            self.setState({ route: "trainer", user: response.data.email, id: response.data.id });
          }
        } else {
          self.setState({ route: "login", user: "Login Error: Wrong username and/or password" });
        }
      }).catch(function (error) {
        self.setState({ route: "login", user: "Login Error: Unfilled fields" });
      });
  }
  handleLogout = () => {
    this.setState({ route: "login", user: "", message: "" });
  }
  render() {
    if (this.state.route === "login") {
      return (
        <div className="App">
              <div className="container Login">
                <h1>TRAINER APP</h1>

                <LogIn handleLogin={this.handleLogin} />

                <p>{this.state.user}</p>
              </div>
        </div>
      );
    } else if (this.state.route === "admin") {
      return (
        <div className="App">
          <br />
          <div className="container">
            <div className="row">
              <div className="top">
                <div className="col-4">
                  <img src={logo} alt="Logo" height="65%" width="65%" />
                </div>

                <div className="offset-4 col-4">
                  <h1>TRAINER APP</h1>
                </div>

              </div>
            </div>
          </div>
          <AdminPage handleLogout={this.handleLogout} user={this.state.user} />
        </div>
      );
    } else {
      return (
        <div className="App">
        <br/>
          <div className="container">
            <div className="row">
              <div className="top">
                <div className="col-4">
                  <img src={logo} alt="Logo" height="65%" width="65%" />
                </div>
                <div className="offset-4 col-4">
                  <h1>TRAINER APP</h1>
                  </div>
                  </div>
                </div>
              </div>
            
            <TrainerPage handleLogout={this.handleLogout} user={this.state.user} id={this.state.id} />
        </div>
      );
    }
  }
}
export default App;