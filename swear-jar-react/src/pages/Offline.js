import BigLogo from "../components/BigLogo";
import MyButton from "../components/MyButton";

const Offline = props =>{
   const {retryConnection} = props;
   return( //placeholder ten obrazek
    <div>
    <BigLogo/>
    <div className="">
    <h1>You are offline</h1>

      <MyButton name="retry" className="standard-button-dark" displayedText="TRY AGAIN" onClick={retryConnection}/>  
    
  </div></div>
);
}
export default Offline