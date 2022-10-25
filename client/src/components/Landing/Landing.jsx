import React from "react";
import { Link } from "react-router-dom";

import Image from "./countries.png";

function Landing() {
   return (
      <div
         className='main'
         style={{
            backgroundImage: `url(${Image})`,
            width: "100%",
            height: "1000px",
         }}>
         <div id='title'>
            <p id='title1'>WELCOME TO</p>

            <p id='title2'>COUNTRIES PI </p>
         </div>
         <br />

         <br />
         <div id='container-button-landing'>
            <Link to='/home'>
               <button name='enter' className='button-landing'>
                  GO ON!
               </button>
            </Link>
         </div>
      </div>
   );
}

export default Landing;
