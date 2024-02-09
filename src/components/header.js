import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Header(){

    return(<nav class="navbar sticky-top">
        <div class="container-fluid">  
                <div className="image">
                    <img id="image" src="../images/lfc_logo-removebg-preview.png"></img>
                </div>
                <div className="church">
                    <h5 id="lfc"> LIVING FAITH CHURCH </h5>
                    <h6> MANDO </h6>
                </div>   
                <div className="row">   
                    <div className="col home">
                        <p> HOME </p>
                    </div>
                    <div className="col services">
                        <p> <ExpandMoreIcon/></p>
                    </div>
                    <div className="col contact">
                        <p> CONTACT </p>
                    </div>
                    <div className="col search">
                    <p> TESTIMONY </p>
                    </div>
                    <div className="col search">
                    <p> MEDIA </p>
                    </div>
                    <div className="col search2">
                        <SearchIcon/>
                    </div>
                </div>
            </div>
    </nav>);
    
}













export default Header;