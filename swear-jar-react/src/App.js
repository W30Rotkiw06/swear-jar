import './App.css';
import React, {Component} from 'react';
import { supabase } from './components/Client';

import WelcomeScreen from './pages/WelcomeScreen';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Offline from './pages/Offline';
import Home from './pages/Home';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      page: "start",
      previous: "",
      supabase: supabase,
      session: "",
      email: "",
      other_mails: "",
      online: ""
    }
    

  }

  async componentDidMount(){
    this.checkInternet()
    const other_mails = (await supabase.from("users").select("user_mail")).data;
    if (other_mails !== null){
      const mails = other_mails.map(item => item.user_mail);
      this.setState({other_mails: mails, online: true});
    }else{
      this.setState({online: false, page: "offline", previous: "start"}); 

  }
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
        default:
          return(
            <h1>coś się zjebało</h1>
          )

      }
  }
}
}


export default App;
