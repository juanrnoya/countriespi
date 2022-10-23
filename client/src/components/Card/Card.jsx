/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, img, continent, id }) {
   return (
      <div className='card'>
         <img src={img} alt='img does not exists' className='card-image' />
         <h3>{name}</h3>
         <h5>{continent}</h5>
         <Link to={`/home/${id}`}>{id}</Link>
      </div>
   );
}
