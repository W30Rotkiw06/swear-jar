import icon from "../main icon.png";
import MyButton from "../components/MyButton";

var LoginScreen = props => {
    const {fn} = props
    return(
        <div className="App">
        <header><img src={icon} className="App-logo" alt="logo" /></header>
        <h1>Swear jar</h1>

          <p>
            Welcome to swear jar app.<br/>Log in or sign up to continue. 
          </p>

          <MyButton name="login" className="standard-button" displayedText="LOG IN" onClick={fn} />
          <br/>
          <MyButton name="signup" className="standard-button-dark" displayedText="SIGN UP" onClick={fn}/>  
        
      </div>
    );
}

export default LoginScreen;