function SettingSegment(props){
   var {image, name="settings name", onClick, type="more", isActive=true, color} = props;
   if (props.isActive === false){props.onClick = null}

    switch(type){
        case "more":
            return(
                <div className="settings-segment" onClick={onClick}>
                    <img src={image} alt="img" className="settings-segment-img"/>
                    <p className="settings-segment-title">{name}</p>
                    <p className="settings-segment-arrow">➤</p>
                </div>
               )
        case "switch":
            return(
                <div className="settings-segment" onClick={onClick}>
                    <img src={image} alt="img" className="settings-segment-img"/>
                    <p className="settings-segment-title">{name}</p>
                </div>
            )
        case "color":
            return(
                <div onClick={props.onClick} className="settings-segment" >
                    <img src={image} alt="img" className="settings-segment-img"/>
                    <p className="settings-segment-title">{name}</p>
                    <div className="select-color-settings" style={{backgroundColor: color}}/>

                </div>
            )
    }

}
export default SettingSegment