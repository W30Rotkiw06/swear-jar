import './App.css';
import React, {Component} from 'react';
import { supabase } from './components/Client';

import WelcomeScreen from './pages/WelcomeScreen';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Offline from './pages/Offline';
import AdBlock from './pages/AdBlock';
import Home from './pages/Home';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';


class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      page: "start",
      previous: "",
      supabase: supabase,
      session: "",
      email: "",
      name: "",
      profile_picture: "",
      online: "",
      avalaible_jars: []
    }
    

  }

  async componentDidMount(){
    this.checkInternet();

}

  checkInternet = async () => { 
    fetch('https://www.google.com', { mode: 'no-cors' })
    .then(() => {
        this.setState({online: true});
        if(this.state.previous !== "" && this.state.page ==="offline"){
          this.setState({page: this.state.previous});
        }
    })
    .catch(() => {
      this.setState({online: false});
      if (this.state.page !== "offline"){
      this.setState({previous: this.state.page});
      this.setState({page: "offline"});}
    })
  
};
  
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
            <WelcomeScreen fn={this.ButtonClicked} active={this.state.online}/> 
          </div>
          )

        case "offline":
          return(
            <div className='App'>
            <Offline retryConnection={this.checkInternet}/>
            </div>
          )
        case "adblock":
          return(
            <div className='App'>
            <AdBlock back={this.BackButton}/>
            </div>
          )
        case "login":
            return (
              <div className='App'>
                <Login fun={this.ImportLoginData} {...this.state} internet={this.checkInternet} back={this.BackButton}/> 
              </div>
            )
        case "signup":
            return (
              <div className='App'>
                <CreateAccount fun={this.ImportLoginData} {...this.state} internet={this.checkInternet} back={this.BackButton}/> 
              </div>
            )
        case "home":
          return(
            <div className='swear-jar'>
            <Home fun={this.ImportLoginData} {...this.state} internet={this.checkInternet} back={this.BackButton}/> 
            </div>
          )

        case "profile-settings":
          return(
            <div className='swear-jar'>
              <ProfileSettings back={this.BackButton} changeAppState={this.ImportLoginData} {...this.state}/>
            </div>
          )
        default:
          return(
            <h1>Sth went wrong</h1>
          )

      }
  }
}
}


export default App;
