import './App.css';
import React, {Component} from 'react';
import WelcomeScreen from './pages/WelcomeScreen';
import MyButton from './components/MyButton';
import Login from './pages/Login';
import { supabase } from './components/Client';
import { useState, useEffect } from 'react';


class App extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      supabase: supabase,
      page: "start",
      previous: "",
      session: "",
      email: "",
    }


  }
  
  
  ImportLoginData = (arg, val)=>{
    this.setState({[arg]: val});
  }


  ButtonClicked = event =>{
    this.setState(
      {page: event.target.name, 
        previous: this.state.page
      }
      )
  }

  BackButton = () =>{
    this.setState(
      {page: this.state.previous, 
        previous: "",
      }
    );
  }



  
  render(){


      {switch(this.state.page){
        case "start":
          return (
          <div className='App'>
            <WelcomeScreen fn={this.ButtonClicked}/>      
          </div>
          )

      
        case "login":
            return (
              <div className='App'>
                <Login fun={this.ImportLoginData} {...this.state}/> 
              
              </div>
            )

      }
  }
}
}


export default App;
