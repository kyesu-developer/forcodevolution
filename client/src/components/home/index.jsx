import React, { Component } from 'react';
 import Header from '../header';
 import PromiseTable from './promisetable'
 import UserTable from './userstable'
 import axios from 'axios'
 class Home extends Component {
    constructor(props){
        super(props);

     this.state = { 
         users:[],
         newpromises:[]
      }
    }
     callNewPromises=async ()=>{
        await   axios.post(`http://157.245.233.15/newpromises`,{},{headers:{
            'x-access-token':localStorage.getItem('token')
        }})
        .then(res => {
            this.setState({newpromises:res.data})
        })
     }
     async componentDidMount(){
        if(!localStorage.getItem('token') ||  !sessionStorage.getItem('exp')){
            window.location='/'
        }
         var exp = sessionStorage.getItem('exp');
        if (exp > new Date()){
            window.location='/'
        }
        await axios.post(`http://157.245.233.15/users`,{},{headers:{
            'x-access-token':localStorage.getItem('token')
        }})
        .then(res => {
            this.setState({users:res.data})
        })
        await this.callNewPromises();
     }    
     render() { 
         return (<React.Fragment>
          <Header />
          <br /><br/>
         <PromiseTable  newpromises={this.state.newpromises} onChange={this.callNewPromises}/>
         <br /><br />
         <UserTable users={this.state.users}/>
         </React.Fragment>
          );
     }
 }
 export default Home;