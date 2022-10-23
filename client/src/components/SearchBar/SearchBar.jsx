/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, getCountryByName } from "../../redux/actions";

function SearchBar({ setCurrentPage }) {
   //  const [order, setOrder] = useState("");

   const [name, setName] = useState("");

   const dispatch = useDispatch();

   function handleInputChange(e) {
      e.preventDefault();
      setName(e.target.value);
   }
   function handleSubmit(e) {
      e.preventDefault();
      dispatch(getCountryByName(name));
      setName("");
      setCurrentPage(1);
      // setOrder(e.target.value);
   }

   return (
      <div>
         <input
            type='text'
            placeholder='Search Country'
            value={name}
            onChange={(e) => handleInputChange(e)}
         />

         <button onClick={(e) => handleSubmit(e)} type='submit'>
            SEARCH
         </button>
      </div>
   );
}

export default SearchBar;
