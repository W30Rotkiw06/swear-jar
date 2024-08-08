import { Component } from "react";

class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile_picture_url: "",
            is_user_already_in_jar: this.props.members_list.includes(this.props.email)
        }
    }

    componentDidMount = async()=>{
        const { data: profile_picture_data,} = await this.props.supabase.storage.from('profile_pictures')
        .download(`${this.props.profile_picture}?t=${new Date().getTime()}`);
        const profile_picture_blob = new Blob([profile_picture_data]);
        this.setState({
            profile_picture_url: URL.createObjectURL(profile_picture_blob),
        });
    }


    handle_div_click = ()=>{
        if (this.state.is_user_already_in_jar){
            window.alert(this.props.name + " is already member of this jar.")
        }else{
            if(window.confirm("Do you want to add " + this.props.name + " to this jar?"))
                {this.props.add_member(this.props.email)}
        }
            
    }

    render(){
        return(
            <div className="search-result" onClick={this.handle_div_click}>
                <img src={this.state.profile_picture_url} className="search-result-image" alt=""/>
                <h1 className="search-result-name">{this.props.name}</h1>

                {
                    this.state.is_user_already_in_jar?
                    <p style={{color: "red"}} className="search-result-email">Already member of this jar</p>
                    :
                    <p className="search-result-email">{this.props.email}</p>
                }
                
            </div>
        )
    }
    
    
}

export default SearchResults