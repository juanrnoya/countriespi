/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, img, continent, id }) {
   return (
      <div className='card'>
         <img
            src={img}
            alt='img does not exists'
            className='card-image'
            height='200px'
            width='300x'
         />
         <h2>{name}</h2>
         <h3>{continent}</h3>
             <Link id='link-card' to={`/home/${id}`}>
            {id}
         </Link>
      </div>
   );
}
