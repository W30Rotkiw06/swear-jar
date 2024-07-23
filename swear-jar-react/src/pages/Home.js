import React, {Component} from "react";
import Jar from "../components/jar/Jar";
import MyButton from "../components/MyButton"

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            avalaible_jars: [],
            profile_picture: "",
            message: "Loading content...",
            deafult_color: "",
        }
    }

    componentDidMount = async () => {
        this.props.internet()
        // Import user data
        let { data, error } = await this.props.supabase.from("users").select().eq("user_mail", this.props.email);
        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }
        const name = data.map(item => item.user_nickname);
        const pp_file_name = data.map(item => item.profile_picture)[0];
        const color = data.map(item => item.deafult_color)[0]
        
        // Import profile picture

        const { data: profile_picture_data, error: error_pp } = await this.props.supabase.storage.from('profile_pictures')
          .download(pp_file_name);
          if (error_pp) {console.error("Error downloading profile picture:", error_pp);
          this.setState({ name: name[0], email: this.props.email, error: error_pp });
          return;
        }
        
        const profile_picture_url = URL.createObjectURL(profile_picture_data);
        this.setState({name: name[0],email: this.props.email,profile_picture: profile_picture_url, color: color});
      }


    componentDidUpdate = async() =>{ // downloading jars
        let jars_with_user = []
        let jar_list = (await this.props.supabase.from("jars").select().order('id', {ascending: true })).data
        for (let jar of jar_list){
            for (let member of jar["members"]){
                if (member[0] === this.state.email){
                    jars_with_user.push(jar)
                }
            }
        }
        let message = jars_with_user.length === 0? "You don't have any opened swear jars yet": "";
        this.setState({avalaible_jars: jars_with_user, message: message})



        
    }

    addNewJar = () =>{
        this.props.fun("previous", "home")
        this.props.fun("page", "add_new_jar")
    }

// this.state.books.map((book, i) => (<BookDescription key = {i} book={book} deleteBook={this.deleteBook}/>))
    render() {
        return(
            <div>
                <div className="head">
                    <h1 className="headline">Your swear jars</h1>
                    <img className="profile-picture" src={this.state.profile_picture} alt='pct'/>
                    <p className="prompt">{this.state.message}</p>
                </div>
                

                <div className='jar_container'>
                {
                    this.state.avalaible_jars.map(jar =>(<Jar jar={jar} key={jar.name} {...this.state} {...this.props}/>))// jakby coś nie działało tow 
                }
            </div>
                <MyButton name="add_neq_jar" className="add-new-jar-button" onClick={this.addNewJar} displayedText="+"/>
            </div>
        )
    }
}


export default Home;