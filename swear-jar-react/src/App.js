import './App.css';
import React, {Component} from 'react';
import LoginScreen from './pages/LoginScreen';
import MyButton from './components/MyButton';

class App extends Component{
  constructor(props){
    super(props);
    const {session} = props;
    this.state = {
      page: "start",
      previous: "",
      session: props.session
    }

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
    )
  }


  
  render(){
    
      {if(this.state.page == "start"){
        return (
        <div className='App'>
          <LoginScreen fn={this.ButtonClicked}/>      
        </div>
        )
      }
        else{
          return (
            <div className='App'>
              <MyButton name="back" className="standard-button" displayedText="BACK" onClick={this.BackButton}/>
            </div>
            
            
          )
        
      }}
    
  }
}


export default App;
