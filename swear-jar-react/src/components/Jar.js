import React, {Component} from "react";
import JarSimple from "./JarSimple";
import JarDetails from "./JarDetails";

class Jar extends Component {
    constructor(props){
        super(props);
        this.state = {
            show_details: false,
            members_list: [],
            members_formated: "Loading content..."
        }
    }

    componentDidMount = async() =>{
        let members_formated = "You";
        let members_list = []

        for (var member of this.props.jar.members){
            members_list.push(member[0])
            if (member[0] !== this.props.email){
                let member_nickname = (await this.props.supabase.from("users").select("user_nickname", "user_mail").eq("user_mail", member[0])).data
                member_nickname = member_nickname.map(item => item.user_nickname)
                members_formated = members_formated + ", " + member_nickname[0];
                
            }
        }
        this.setState({members_formated: members_formated, members_list: members_list})
    }

    showHideDetails = () =>{
        this.setState({show_details: !this.state.show_details})
    }

    
    render(){
        if (this.state.show_details === false){
            return(<JarSimple jar={this.props.jar} onClick={this.showHideDetails} {...this.state}/>)
        } else{
            return(
            <JarDetails jar={this.props.jar} onClick={this.showHideDetails} {...this.state}/>
        )
        }
    }
    
}



export default Jar;