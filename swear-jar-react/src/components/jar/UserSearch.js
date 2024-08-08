import { Component } from "react";
import SearchResults from "./SearchResult";

class UserSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            searched_user: null,
            search_results: [],
            message: ""
        }
    }

    handleSearchChange = event =>{
        this.setState({searched_user: event.target.value});
    }

    search= async()=>{
        let message = ""
        let{data} = await this.props.supabase.from("users").select().textSearch("user_mail", this.state.searched_user);
        let{data: data2} = await this.props.supabase.from("users").select().textSearch("user_nickname", this.state.searched_user);
        let results = [];
        
        if (data.length >0){
            for (let result of data){results.push(result)}}
        else{if (data2.length >0){
            for (let result of data2){results.push(result)}
        }
        else{
            message =  "Nothing found";
        }}

        this.setState({search_results: results, message: message})
    }

    add_member = async(member)=>{
        let new_member_col = [member, 0, false];
        let members_col = this.props.jar.members;
        members_col.push(new_member_col);
        await this.props.supabase.from("jars").update({"members": members_col}).eq("id", this.props.jar.id);
        this.props.update();
        this.props.close();
    }

    render(){
        return(
            <div className="user-search">
                <input className="user-search-input" name="search" value={this.state.searched_user} onChange={this.handleSearchChange} placeholder="Enter name or email"/>
                <button onClick={this.search} className="user-search-button">🔍</button>
                {
                    this.state.search_results.length ===0? <p className="nothing-found">{this.state.message}</p>: <></>
                }
                <div className="search-results">

                    {  
                        this.state.search_results.map((person,i) =>
                            (<SearchResults key={person.user_nickname}
                                id={i}
                                email={person.user_mail}
                                name={person.user_nickname}
                                profile_picture = {person.profile_picture}
                                members_list ={this.props.members_list}
                                add_member = {this.add_member}
                                session={this.props.session}
                                supabase={this.props.supabase}/>))
                    }
                </div>
            </div>
        );
    }
}

export default UserSearch;