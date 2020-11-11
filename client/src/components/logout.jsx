import React, { Component } from 'react';
class Logout extends Component {
    constructor(props){
        super(props)


    }
    componentWillMount() {
         localStorage.removeItem('key')
        sessionStorage.removeItem('exp')
        window.location='/'
    }
    
    render() { 
        
        return ( <h1>Logut</h1> );
    }
}
 
export default Logout;