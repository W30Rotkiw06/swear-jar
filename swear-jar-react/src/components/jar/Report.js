import { Component } from "react";
import ReportedMember from "./ReportedMember";

class Report extends Component{
    constructor(props){
        super(props);
        let size = this.props.members_list.length > 5? "-small": ""
        this.state = {
            size: size,
        }
    }

    reportMe = async(i) =>{
        var bill = this.props.jar.members
        bill[i][1] =  bill[i][1] + this.props.jar.price_per_word 
        const msg = this.props.members_names_list[i] + " added $" + this.props.jar.price_per_word + " to " + this.props.jar.name + " jar."
        alert(msg)
        await this.props.supabase.from('jars').update({members: bill, total_money: this.props.jar.total_money + this.props.jar.price_per_word}).eq("name", this.props.jar.name)
        this.setState()


    }
    render(){
        return(
            <div className="jar-report">
                <hr className="jar-header-line"/>
                <p className="jar-highlit">Who said naughty word?</p>
                <div className="jar-report-member-choose">
                {
                    this.props.members_list.map((person, i) =>
                        (<ReportedMember key={this.props.members_names_list[i]}
                            id={i}
                            report={this.reportMe}
                            email={person}
                            nickname={this.props.members_names_list[i]}
                            profile_picture={this.props.members_profile_pictures[i]}
                            size={this.state.size}
                            color={this.props.members_colors[i]}
                            session={this.props.session}
                            supabase={this.props.supabase}/>))
                }
            </div></div>  
        )
    }
}
export default Report;