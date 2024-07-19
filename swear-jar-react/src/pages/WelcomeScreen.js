import BigLogo from "../components/BigLogo";
import MyButton from "../components/MyButton";

var WelcomeScreen = props => {
    const {fn} = props
    return(
        <div>
        <BigLogo/>
        <div className="Login-interface">
        <h1>Swear jar</h1>
          <p>
            Welcome to swear jar app.<br/>Log in or sign up to continue. 
          </p>

          <MyButton name="login" className="standard-button" displayedText="LOG IN" onClick={fn} /><br/>
          <MyButton name="signup" className="standard-button-dark" displayedText="SIGN UP" onClick={fn}/>  
        
      </div></div>
    );
}

export default WelcomeScreen;