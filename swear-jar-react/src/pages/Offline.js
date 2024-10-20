import MyButton from "../components/MyButton";
import lama_offline from "../assets/lama offline.jpg"
const Offline = props =>{
   const {retryConnection} = props;
   return( //placeholder ten obrazek
    <div>
    <img src={lama_offline} alt="" style={{width: "400px", borderRadius: "40px", position: 'relative', bottom: "50px"}}/>
    <div className="">
      <MyButton name="retry" className="standard-button-dark" displayedText="TRY AGAIN" onClick={retryConnection}/>  
    
  </div></div>
);
}
export default Offline