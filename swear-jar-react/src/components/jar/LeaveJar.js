import { Component } from "react";
import MyButton from "../MyButton";

class LeaveJar extends Component{
    constructor(props){
        super(props)
    }

    leave = async()=>{
    let members = this.props.jar.members;
        if (window.confirm("Do you want to leave " + this.props.jar.name + "?")){
            members.splice(this.props.user_as_member_id, 1);
            await this.props.supabase.from('jars').update({members: members}).eq("id", this.props.jar.id);
            this.props.update();
        }
    }

    render(){
        if (this.props.jar.members[this.props.user_as_member_id][1] === 0){
            return(
                <div style={{position: "absolute", bottom: "14px", left: "81px"}}>
                    <MyButton onClick={this.leave} name="leave" displayedText="LEAVE JAR" className="mini-button red-delete-button"/>
                </div>
            )
        }else{return(<></>)}
        
    }
    
}
export default LeaveJar