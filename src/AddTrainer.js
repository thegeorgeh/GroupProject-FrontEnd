import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import * as constants from './Constants.js';

class AddTrainer extends Component{
    constructor(props){
        super(props);
        this.state = {message:"", formDisplay:true};
    }
    handleSubmit =(e)=>{
        e.preventDefault();
        let body = { trainerFirstName:this.state.trainerFirstName, trainerLastName: this.state.trainerLastName,
             confirmPassword:this.state.password, password:this.state.password2, email:this.state.email};
        var self = this;
        if(this.state.password===this.state.password2){
            Axios.post(constants.CREATE_ACCOUNT_URL, body).then(function(response){
                console.log(response);
                self.setState({message: response.data, formDisplay:false});
            }).catch(function(error){
                console.log(error);
                self.setState({message: "temp3", formDisplay:false});
            });
        }else{
            this.setState({message:"Passwords don't match"})
        }
    }
    enterPress =(e)=>{
        var code = e.keyCode || e.which;
        if(code===13){
            this.handleSubmit(e);
        }
    }
    updateState =(e)=>{
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value, message: "", formDisplay:true});
    }
    dispForm=()=>{
        this.setState({message:"", formDisplay:true})
    }
    render(){
        if(this.state.formDisplay===true){
        return(
            <div className="addTrainer">
            <br/>
            <form onSubmit={this.handleSubmit}>
                <p className="form-font">First name: </p>
                <input type="text" name="trainerFirstName" placeholder="First name" id="firstnamebox-addtrainer" onChange={this.updateState}/>
                <br/>
                <p className="form-font">Last name: </p>
                <input type="text" name="trainerLastName" placeholder="Last name" id="lastnamebox-addtrainer" onChange={this.updateState} />
                <br/>
                <p className="form-font">Email:</p>
                <input type="email" name="email" placeholder="Email" id="emailbox-addtrainer" onChange={this.updateState} />
                <p className="form-font">Password: </p>
                <input type="password" name="password" placeholder="password1" id="passwordbox-addtrainer" onChange={this.updateState}/>
                <br/>
                <p className="form-font">Re-type Password: </p>
                <input type="password" name="password2" placeholder="password2" id="passwordbox2-addtrainer" onChange={this.updateState} onKeyPress={this.enterPress}/>
                <br/>
                <input type="submit" id="submit-button-addtrainer" value="Add this trainer"/>
            </form>
            <p>{this.state.message}</p>
            </div>
        );
        }else{
            return(
                <div className="addTrainer">
        
                <p>{this.state.message}</p>
                <button type="button" onClick={this.dispForm}>Add new trainer</button>
            </div>
            );
        }
    }
}
export default AddTrainer;