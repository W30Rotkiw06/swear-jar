import React, {Component} from "react";
import Jar from "../components/jar/Jar";
import MyButton from "../components/MyButton"
import AddNewJar from "../components/jar/AddNewJar";

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
            add_new_jar_window: false,
            subscription: null
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
          .download(`${pp_file_name}?t=${new Date().getTime()}`);
          if (error_pp) {console.error("Error downloading profile picture:", error_pp);
          this.setState({ name: name[0], email: this.props.email, error: error_pp });
          return;
        }
        
        const profile_picture_blob = new Blob([profile_picture_data]);
        const profile_picture_url = URL.createObjectURL(profile_picture_blob);

        this.setState({name: name[0],email: this.props.email,profile_picture: profile_picture_url, color: color});
        this.props.fun("name", name[0])
        this.props.fun("profile_picture", profile_picture_url)

        // creating subscription that will update jars
        await this.updateJars();

        this.props.supabase.channel(this.props.email).on('postgres_changes', { event: '*', schema: 'public', table: 'jars' }, payload => {
        console.log('Change received!', payload)
        this.updateJars()
        }).subscribe()
    }

    componentWillUnmount = async ()=>{
        this.props.supabase.removeAllChannels()
    }

    updateJars = async() =>{
        let jars_with_user = [];
        let jar_list = (await this.props.supabase.from("jars").select().order('id', {ascending: true })).data
        for (let jar of jar_list){
            for (let member of jar["members"]){
                if (member[0] === this.state.email){
                    jars_with_user.push(jar);
                }
            }
        }
        let message = jars_with_user.length === 0? "You don't have any opened swear jars yet": "";
        this.setState({avalaible_jars: jars_with_user, message: message});
    }


    openCloseAddJarWin = () =>{
        this.setState({add_new_jar_window: !this.state.add_new_jar_window});
    }

    openProfileSettings = () => {
        this.props.fun("page","profile-settings");
        this.props.fun("previous", "home");
    }

// this.state.books.map((book, i) => (<BookDescription key = {i} book={book} deleteBook={this.deleteBook}/>))
    render() {
        return(
            <div>
                <div className="head">
                    <h1 style={{position: "relative", right: "4px"}} className="headline">Your swear jars</h1>
                    <img className="profile-picture" onClick={this.openProfileSettings} src={this.state.profile_picture} alt='pct'/>
                    <p className="prompt">{this.state.message}</p>
                </div>

                <div className='jar_container'>
                {
                    this.state.avalaible_jars.map(jar =>(<Jar jar={jar} key={jar.name} {...this.state} {...this.props}/>))// jakby coś nie działało tow 
                }
                {this.state.add_new_jar_window? (<AddNewJar email={this.state.email} {...this.props} closeWin={this.openCloseAddJarWin}/>): (<></>)}
                  
                <MyButton name="add_new_jar" className="standard-button add-new-jar-button" onClick={this.openCloseAddJarWin} displayedText="CREATE NEW JAR"/>
            </div>
            </div>
        )
    }
}


export default Home;