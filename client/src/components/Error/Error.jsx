import React from "react";
import { Link } from "react-router-dom";
import Image from "./countries.png";

function Error() {
   return (
      <div
         style={{
            backgroundImage: `url(${Image})`,
            width: "100%",
            height: "1000px",
         }}>
         <p id='h1-error-page'>PAGE NOT FOUND</p>
         <br />
         <Link to='/home'>
            <button name='volver' className='button-error'>
               Go home!
            </button>
         </Link>
      </div>
   );
}

export default Error;
