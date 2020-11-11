import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Header extends Component {
    state = {  }
    render() { 
        return (<nav class="navbar navbar-default">
        <div class="container-fluid">
           <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">DailyPromise</a>
          </div>
           <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li> <Link class="navbar-brand" to="logout">Logout</Link></li>
             </ul>
          </div> 
        </div> 
         </nav>
  );
    }
}
 
export default Header;