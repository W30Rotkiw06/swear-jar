import BigLogo from "../components/BigLogo";
import MyButton from "../components/MyButton";

var WelcomeScreen = props => {
    const {fn, active} = props
    const txt = active? "Log in or sign up to continue.": "Loading content...";
    return(
        <div>
        <BigLogo/>
        <div className="Login-interface">
        <h1>Swear jar</h1>
          <p>
            Welcome to swear jar app.<br/>{txt} 
          </p>

          <MyButton name="login" className="standard-button" displayedText="LOG IN" onClick={fn} isDisabled={!active}/><br/>
          <MyButton name="signup" className="standard-button-dark" displayedText="SIGN UP" onClick={fn} isDisabled={!active}/>  
        
      </div></div>
    );
}

export default WelcomeScreen;