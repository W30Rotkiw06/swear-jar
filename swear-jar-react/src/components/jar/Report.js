import { Component } from "react";
import ReportedMember from "./ReportedMember";
import Switch from 'react-ios-switch';

class Report extends Component{
    constructor(props){
        super(props);
        let size = this.props.members_list.length > 5? "-small": ""
        this.state = {
            size: size,
            sus_color: "green",
            rem_color: "red",
            switch_state: this.props.suspend_remove,
        }

    }
    reportMe = async(i) =>{
        if (!this.props.is_suspended || this.props.members_list[i] === this.props.email){
        let bill = this.props.jar.members
        if (this.props.manage_members){
            if (this.props.suspend_remove){ //remove people
                if (window.confirm("Do you want to delete "+ this.props.members_names_list[i] + "?")){
                    bill.splice(i, 1);
                }
            }else{
                let msg = bill[i][2]? "Do you want to remove " + this.props.members_names_list[i] +"'s suspention" : "Do you want to suspend "+ this.props.members_names_list[i] + "? "+ this.props.members_names_list[i] + " won't be able to report members of this jar.";
                if (window.confirm(msg)){
                    bill[i][2] = !bill[i][2];
                }
            }
            await this.props.supabase.from('jars').update({members: bill}).eq("id", this.props.jar.id);
            this.props.callback_jar("just_removed", true)
            this.props.close()
            this.props.update()
            
        }else{
        
        // adding x money to chosen member bill
        bill[i][1] =  bill[i][1] + this.props.jar.price_per_word 
        const msg = "Are you sure to report " + this.props.members_names_list[i] + "?";
        if (window.confirm(msg)){
            await this.props.supabase.from('jars').update({members: bill, total_money: this.props.jar.total_money + this.props.jar.price_per_word}).eq("id", this.props.jar.id)
            // downolading and updating data of reported user
            var {data} = await this.props.supabase.from("users").select().eq("user_mail", bill[i][0])
            let reported_user = data.map(item => item.was_reported)[0]
            await this.props.supabase.from("users").update({"was_reported": reported_user + 1}).eq("user_mail", bill[i][0])
            
            // downloading and updating data of reporting user
            var {data} = await this.props.supabase.from("users").select().eq("user_mail", this.props.email)
            let reporting_user = data.map(item => item.reported_someone)[0]
            await this.props.supabase.from("users").update({"reported_someone": reporting_user + 1}).eq("user_mail",this.props.email)
        }else{}
        
        }
        this.setState()
        }else{window.alert("You are suspended. You can't report other users")}

    }

    handleSwitch = () =>{
        let color1 = this.state.sus_color, color2 = this.state.rem_color;
        this.props.callback("suspend_remove", !this.state.switch_state)
        this.setState({switch_state: !this.state.switch_state, sus_color: color2, rem_color: color1})
    }
    render(){
        try{

        return(
            <div className="jar-report">
                <hr className="jar-header-line"/>
                <p className="jar-highlit">{this.props.header}</p>
                <div className="jar-report-member-choose">
                {
                    this.props.members_list.map((person, i) =>
                        (<ReportedMember key={this.props.members_names_list[i]}
                            id={i}
                            report={this.reportMe}
                            email={person}
                            nickname={this.props.members_names_list[i]}
                            profile_picture={this.props.members_profile_pictures[i]}
                            premium={this.props.members_premium[i]}
                            size={this.state.size}
                            color={this.props.members_colors[i]}
                            manage_members={this.props.manage_members}
                            suspended={this.props.jar.members[i][2]}
                            session={this.props.session}
                            supabase={this.props.supabase}/>))
                }
            </div>
            {
                this.props.manage_members?
                <div className="suspend-or-remove-menu" >
                <p style={{color: this.state.sus_color}}>suspend</p>
                <Switch className="suspend-or-remove-switch" onChange={this.handleSwitch} checked={this.state.switch_state}/>
                <p style={{color: this.state.rem_color}}>remove</p>
            </div>: <></>
            }
            
            
            </div>  
        )
        }catch(error){
        }
}
}
export default Report;