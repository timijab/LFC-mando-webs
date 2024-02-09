import React from "react";
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import SubscriptionsSharpIcon from '@mui/icons-material/SubscriptionsSharp';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import InstagramIcon from '@mui/icons-material/Instagram';


var time = new Date();
var year = time.getFullYear();

function FacebookLink(){
    window.open('https://www.facebook.com/lfcmandokaduna');
}
function YoutubeLink(){
    window.open('https://www.youtube.com/@lfcmando');
}
function Footer(){
    return(
        <footer className="footer">
            <div className="firstsection container">
                <h5> Follow us on our social media platforms.</h5>
            </div>
            <div className="socialsection container">
                <div className="row">
                    <div className="facebook soc col-xs-6 col-sm-3 col-md-3 col-lg-3" onClick={FacebookLink}>
                        <p> <FacebookSharpIcon/>  </p>
                        
                    </div>
                    <div className="youtube soc col-xs-6 col-sm-3 col-md-3 col-lg-3" onClick={YoutubeLink}>
                        <p> <SubscriptionsSharpIcon/> </p>
                        
                    </div>
                    <div className="Telegram soc col-xs-6 col-sm-3 col-md-3 col-lg-3">
                        <p> <SendSharpIcon/> </p>
                       
                    </div>
                    <div className="instagram soc col-xs-6 col-sm-3 col-md-3 col-lg-3">
                        <p> <InstagramIcon/> </p>
                        
                    </div>
            </div>
            </div>
            <div className="copyright"><p> © {year} Media Unit. </p> </div>
        </footer>
    )
}

export default Footer;