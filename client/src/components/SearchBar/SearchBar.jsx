/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";

function SearchBar({ setCurrentPage }) {
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
   }

   return (
      <div className='searchbar-div'>
         <div>
            <input
               id='input-search'
               type='text'
               placeholder='Search Country'
               value={name}
               onChange={(e) => handleInputChange(e)}
            />
         </div>
         <br />
         <div>
            <button onClick={(e) => handleSubmit(e)} type='submit'>
               SEARCH
            </button>
         </div>
      </div>
   );
}

export default SearchBar;
