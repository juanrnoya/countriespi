/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

function SearchBar({ setCurrentPage }) {
   const [order, setOrder] = useState("");
   const allCountry2 = useSelector((state) => state.allCountries);
   const [name, setName] = useState("");

   const dispatch = useDispatch();

   //console.log(name);

   function handleInputChange(e) {
      e.preventDefault();
      setName(e.target.value);
   }
   function handleSubmit(e) {
      e.preventDefault();
      const countryFilterByName = allCountry2.filter((e) =>
         e.name.toLowerCase().includes(name.toLowerCase())
      );

      if (name && (!countryFilterByName || countryFilterByName.length === 0)) {
         alert("Country searched does not exists");
         console.log(countryFilterByName);
      } else if (!name) {
         alert("Type a country name");
      } else {
         dispatch(getCountries());
         setName("");
         setCurrentPage(1);
         setOrder(e.target.value);
      }
   }

   return (
      <div>
         <input
            type='text'
            placeholder='Search Country'
            value={name}
            onChange={(e) => handleInputChange(e)}
         />

         <button onClick={(e) => handleSubmit(e)}>SEARCH</button>
      </div>
   );
}

export default SearchBar;
