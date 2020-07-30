import React from 'react';
import Navbar from './components/navbar/Navbar';
import DashBoard from './components/overview/dashboard';
import Transactions from './components/transactions/transactions';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";


class App extends React.Component {
  state = {
    nav_state: 'nav_is_not_active'
  }

  updateData = (value) => {
    if (value) {
      this.setState({ nav_state: 'nav_is_active' })
    } else {
      this.setState({ nav_state: 'nav_is_not_active' })
    }
  }

  render() {
    // console.log(window.sessionStorage)
    return (
      <Router>
        <div className="App">

          <Navbar updateData={this.updateData}/>

          <Switch>
            <Route path="/overview">
              <div className={this.state.nav_state.toString()}>
                <DashBoard />
              </div>
            </Route>

            <Route path="/transactions">
              <div className={this.state.nav_state.toString()}>
                <Transactions />
              </div>
            </Route>

            <Route path="/sheduler">
              <div className={this.state.nav_state.toString()}>
                Sheduler
              </div>
            </Route>

            <Route path="/reports">
              <div className={this.state.nav_state.toString()}>
                reports
              </div>
            </Route>

            <Route path="/about">
              <div className={this.state.nav_state.toString()}>
                <h2>About this app </h2>
              </div>
            </Route>

          </Switch>

        </div>
      </Router>
    );
  }
}

export default connect(null)(App);