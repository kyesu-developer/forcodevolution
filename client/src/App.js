
import React, { Component } from 'react';
 import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {
  TitleComponent
} from '../src/components/TitleComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home';
import Logout from './components/logout';

const withTitle = ({ component: Component, title }) => {
  return class Title extends Component {
      render() {
          return (
              <React.Fragment>
                  <TitleComponent title={title} />
                  <Component {...this.props} />
              </React.Fragment>
          );
      }
  };
};
const LoginComponent = withTitle({ component: Login, title: 'Login' });
const HomeComponent = withTitle({ component: Home, title: 'Home' });
class App extends Component {
constructor(props){
  super(props);

  this.state = {  }

}
  render() { 
    return (     <React.Fragment>
      <Router>
          <Switch>
          <Route
         exact path='/'
          render={(props) => <Login {...props}  />}
          />
          <Route exact path="/home">
             <HomeComponent />
           </Route>
           <Route exact path="/logout" 
          render={(props) => <Logout {...props}  />} />
         </Switch>
      </Router>
      </React.Fragment> );
  }
}
 
 
export default App;
