import React from "react";
import {MusicPlayerSlider} from "./player";

function Messages(props){    
    // var id = props.audio.audioID
    console.log(props.link);
    return(
        <div>
            <div className="left">
                    <MusicPlayerSlider title={props.audio.title} speaker={props.audio.speaker} link={props.audio.audioUrl} audioid={props.audio.audioID} playerprop={props.playprops}/>
            </div>
        </div>
)

}

export default Messages;