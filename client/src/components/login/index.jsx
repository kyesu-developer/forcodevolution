import React, { Component } from 'react';
import './login.css';
import avatar from '../../../src/avatar.png'
import axios from 'axios';
import { Redirect } from 'react-router';

class Login extends Component {

    constructor(props){
        super(props);
      
    this.state = { 
        username:"",
        password:"",
        error:"",
        success:"",
        btnState:true
     }
    }
     handleChange=(event) =>{
         let target =event.target.name;
        this.setState({[target]: event.target.value});
        this.setState({btnState:true})
        if(this.state.username && this.state.password){
            this.setState({btnState:false})
        }
      }
      handleSubmit=async(event)=> {
        event.preventDefault();
        this.setState({btnState:true})
        let data= this.state;
         let {history} = this.props;
        await axios.post(`http://157.245.233.15/login`,{data:{username:data.username,password:data.password}})
        .then(res => {
           
           if(res.data.isValid){
            this.setState({
                error:'',
                success:"Login Successfull!"
            })
            localStorage.setItem("token", res.data.token)
            sessionStorage.setItem('exp', JSON.stringify({exp: new Date() + 60}));   //A value meant to expire in 5 minutes
            return history.push('/home') 
           }
  
        }).catch(err=>{
            this.setState({success:'',error:"Invalid Username or Password",password:""})

        }) 
      
       }
    
     
    render() { 

        if(localStorage.getItem('token') &&  sessionStorage.getItem('exp')){
            return <Redirect to="/home"/>
        }
        return ( 
            
         <div class="login-form">
        <form onSubmit={this.handleSubmit} method="post">
		<div class="avatar">
			<img src={avatar} alt="Avatar"/>
		</div>
         <h2 class="text-center">Member Login</h2>   
        <div class="form-group">
        	<input type="text" class="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" required="required"/>
        </div>
		<div class="form-group">
            <input type="password" class="form-control" name="password" value={this.state.password}   onChange={this.handleChange}  placeholder="Password" required="required"/>
        </div>        
        <div class="form-group">
        <button class="btn btn-primary btn-lg btn-block" disabled={this.state.btnState}>Sign in</button>
        </div>
        <div class="form-group">
        <p class="red">{this.state.error}</p>
        <p class="green">{this.state.success}</p>
        </div>
		<div class="clearfix">
            <label class="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
            <a href="#" class="pull-right">Forgot Password?</a>
        </div>
    </form>
    <p class="text-center small">Don't have an account? <a href="#">Sign up here!</a></p>
 </div>
 

         );
    }
}

export default Login;


 