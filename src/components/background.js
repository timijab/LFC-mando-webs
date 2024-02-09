import React, { useState, useEffect } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Messages from "./messages";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PlayForWorkOutlinedIcon from '@mui/icons-material/PlayForWorkOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';



const pre = new Date();
const original = new Date(pre.getFullYear(), pre.getMonth())
const premonth = original.toLocaleDateString('default', {month:"long"});

export function checkmate(value){
    if (value === true){
        return true;
    }else if (value === false){
        console.log('triggered');
        return false;
    }

}

export function LeftRight(){
    // handle massages of the month.
    const [backendData, setBackendData] = useState([]);
    const [newAudio, setAudio] = useState({});
    const[originalmonth, updatedmonth] = useState(premonth);
    const[playprop, updateprop] = useState(false);
    // fetch request to backend.
    useEffect(() => {
        fetch('/api/audio/monthly/'+originalmonth).then((response) => response.json())
        .then((data) => {
            setBackendData(data);
            
        }).catch((error) => console.error(error));
      }, [originalmonth]);

    const [buttonClicked, setButtonClicked] = useState(new Array(backendData.length).fill(false));  

    function handleButtonClick(index){
        // Create a copy of the buttonClicked array(filled with false)
        const updatedButtonClicked = [...buttonClicked];
        // Toggle the clicked state for the clicked element to true
        updatedButtonClicked[index] = !updatedButtonClicked[index];
        // Update the state with the new array
        setButtonClicked(updatedButtonClicked);
      };

    function Months(direction){
        // we need to work on this process.
        var monthNumber = new Date(originalmonth + "1").getMonth();
        if (direction === "r"){
            monthNumber -= 1 ;
        }else if (direction === "l"){
            monthNumber += 1;
        }
        var dateq = new Date(pre.getFullYear(), monthNumber);
        var newmonth = dateq.toLocaleString('default', {month: 'long'});
        updatedmonth(newmonth);

    }   
    return(
        <div className="middle">
            <Messages audio={newAudio} playprops={playprop}/>

            {/* month we need to add the ability to search by month*/}
            <div className="right">
               <div className="months"> 
                    <ArrowLeftIcon
                    className="left-arrow"
                    onClick={() => {
                        Months("r");
                    }}/> 
                    <h3 id="monthtext"> {originalmonth} </h3> 
                    <ArrowRightIcon
                        className="right-arrow"
                        onClick={() => {
                            Months("l");
                        }}
                    />
              </div>  
              {/* message title */}
              <div className="messagetitle">
                <ul id="order">
                        {backendData.map((audio, index) =>{
                            return(<div>
                                <li><h6 key={index}>{audio.title} by {audio.speaker}.</h6></li>
                                {/* get the logic for this check mate */}
                                <div> {buttonClicked[index] ? <PauseCircleOutlineOutlinedIcon key={index} onClick={()=>{handleButtonClick(index);}} className="play"/> : <PlayArrowOutlinedIcon onClick={()=>{handleButtonClick(index); setAudio(audio); updateprop(true); checkmate(true)}} className="play"/> }<PlayForWorkOutlinedIcon onClick={()=>{}} className="down"/><StopCircleIcon className="stop"/> 
                            <FavoriteIcon className="fave"/></div>
                            </div>)
                        })}  
                        
                    </ul>
            </div>
                
                <div className="deg">
                        <h5 id="deg"> Donate </h5>
                </div>

            </div>
            
        </div>
    );
}


