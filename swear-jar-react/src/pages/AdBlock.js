import MyButton from "../components/MyButton";
import lama_offline from "../assets/lama offline.jpg"
const AdBlock = props =>{
   
   return( //placeholder ten obrazek
    <div>
        <h1>You are using ad blocker!</h1>
        <p style={{position: "relative", bottom:"20PX"}}>Please disable your ad blocking software<br/>and press the button to continue.</p>
    <img src={lama_offline} alt="" style={{width: "400px", borderRadius: "40px", position: 'relative', bottom: "20px"}}/>
    <div className="">
      <MyButton name="retry" className="standard-button-dark" displayedText="TRY AGAIN" onClick={props.back}/>  
    
  </div></div>
);
}
export default AdBlock