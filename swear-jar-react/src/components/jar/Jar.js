import React, {Component} from "react";
import JarSimple from "./JarSimple";
import JarDetails from "./JarDetails";

class Jar extends Component {
    constructor (props){
        super(props);

        this.state = {
            show_details: false,
            members_list: [this.props.email],
            members_names_list: [this.props.name],
            members_colors: [],
            members_profile_pictures: [this.props.profile_picture],
            members_formated: "Loading content...",
            jar_height: "80"
        }
    }


    componentDidMount = async() =>{
        let members_formated = "You";
        let members_list = [], members_names_list = []
        let members_profile_pictures = [];
        let members_colors = []

        for (var member of this.props.jar.members){
            if (member[0] !== this.props.email){
                let member_data = (await this.props.supabase.from("users").select().eq("user_mail", member[0])).data
                let member_nickname = member_data.map(item => item.user_nickname);   
                members_formated = members_formated + ", " + member_nickname[0];
            }
        }
        this.setState({members_formated: members_formated})

        
        for (var member of this.props.jar.members){
            members_list.push(member[0]);
            // download nickname of member, deafult_color and profile picture file name
            let member_data = (await this.props.supabase.from("users").select().eq("user_mail", member[0])).data

            let member_nickname = member_data.map(item => item.user_nickname);
            members_names_list.push(member_nickname[0]);

            let color = member_data.map(item => item.deafult_color);
            members_colors.push(color[0]);
            let member_file_name = member_data.map(item => item.profile_picture);

            // download profile picture
            const { data: profile_picture_data, error: error_pp } = await this.props.supabase.storage.from('profile_pictures')
            .download(`${member_file_name}?t=${new Date().getTime()}`);
            if (error_pp) {
                console.error("Error downloading profile picture:", error_pp);
                return;
            }

            const profile_picture_blob = new Blob([profile_picture_data]);
            const profile_picture_url = URL.createObjectURL(profile_picture_blob);
            members_profile_pictures.push(profile_picture_url);
        }
        this.setState({members_list: members_list, members_names_list: members_names_list, members_profile_pictures: members_profile_pictures, members_colors: members_colors})
    }

    showHideDetails = () =>{
        this.setState({show_details: !this.state.show_details})
    }

    changeHeight = (newHeight) =>{
        this.setState({jar_height: newHeight})
    }

    
    render(){
        
        return(
            <div className="jar" style={{backgroundColor: this.props.jar.color, height:this.state.jar_height + "px"}}>
            {this.state.show_details === false?
                <JarSimple changeHeight={this.changeHeight}  jar={this.props.jar} onClick={this.showHideDetails} {...this.state}/>
                :
                <JarDetails changeHeight={this.changeHeight} jar={this.props.jar} close={this.showHideDetails} email={this.props.email} {...this.state} session={this.props.session} supabase={this.props.supabase}/>
            }
            </div>
        )

        }
    }




export default Jar;