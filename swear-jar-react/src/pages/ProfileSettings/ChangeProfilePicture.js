import React, { Component } from "react";
import MyButton from "../../components/MyButton";


class ChangeProfilePicture extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: this.props.profile_picture,
            save_button: false,
            file_name: "",
            new_file: null
        }
        this.fileInputRef = React.createRef();

    }

    changeImg = (event)=>{
        const file = event.target.files[0]
        if (file){
            const newFileName = `${this.props.email}.jpg`;

            const newFile = new File([file], newFileName, { type: file.type });
            const fileURL = URL.createObjectURL(newFile);

            this.setState({
                new_file: newFile,
                file: fileURL,
                file_name: newFileName,
                save_button: true,
                buttton_text: "SAVE CHANGES"
            });
            }
        };


    handleClick = () => {
        this.fileInputRef.current.click();
    };

    saveChanges = async() => {
        // import old profile pct file name
        this.setState({buttton_text: "SAVING..."})
        var {data, error} = await this.props.supabase.from("users").select().eq("user_mail", this.props.email);
        let file_name = data[0].profile_picture;

        if (file_name !== "deafult.jpeg"){
            var { data, error } = await this.props.supabase.storage.from('profile_pictures')
            .update(file_name, this.state.new_file, {
                cacheControl: '3600',
                upsert: true
            })
            console.log(error)
        }else{
            file_name = this.props.email + ".jpg";
            
            var { data, error } = await this.props.supabase.storage.from('profile_pictures')
            .upload(file_name, this.state.new_file,{
                cacheControl: '1200',
                upsert: false
            })
        }

        // download current datetime 
        const date_now = new Date();
        const utc_date = date_now.toISOString();

        await this.props.supabase.from("users").update({profile_picture: file_name, last_photo_modification: utc_date}).eq("user_mail", this.props.email)
        this.props.back()
    } 

    render(){
        return(
            <div style={{position: "relative", "top": "20px"}}>

                <div className="head">
                <MyButton key="back" onClick={this.props.backToSettings} name="back" displayedText="← BACK" className="back-button back-button-transform"/>
                </div>
                
                <div className="head">
                    <h1 style={{fontSize: "28px"}} className="headline-left">Change profile picture</h1>
                </div>

                <div className='jar_container'>
                    <img src={this.state.file} alt="img" className="large-profile-picture"/>

                    <button style={{marginTop: "20px"}} onClick={this.handleClick} className="standard-button">SELECT FILE</button>

                    {
                        this.state.save_button? <MyButton className="standard-button-dark" onClick={this.saveChanges} displayedText={this.state.buttton_text}/>: <></>
                    }

                    <input 
                        ref={this.fileInputRef}
                        type="file" 
                        onChange={this.changeImg} 
                        style={{ display: 'none' }} 
                        accept="image/jpg"
                    />
            </div>
            </div>
        )
    }
}

export default ChangeProfilePicture