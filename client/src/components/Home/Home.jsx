/** @format */
import "./Home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
   getCountries,
   sortByPopulation,
   filterByContinent,
   sortByAlp,
} from "../../redux/actions";

import Card from "../Card/Card";
import Page from "../Page/Page";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
   const allCountry = useSelector((state) => state.country);

   const allPopulation = useSelector((state) => state.population);
   const [order, setOrder] = useState("");

   const [currentPage, setCurrentPage] = useState(1);
   const [countryPerPage, setCountryPerPage] = useState(10);
   const indexOfLastCountry = currentPage * countryPerPage; //20;
   const indexOfFirstCountry = indexOfLastCountry - countryPerPage; //10

   let currentCountry = allCountry.slice(
      indexOfFirstCountry,
      indexOfLastCountry
   );

   const paginated = (pageNumber) => setCurrentPage(pageNumber);

   if (indexOfLastCountry === 10) {
      currentCountry = allCountry.slice(0, 9);
   }
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getCountries());
   }, [dispatch]);

   const handleClick = (e) => {
      e.preventDefault();
      dispatch(getCountries());
   };

   function handleSort(e) {
      e.preventDefault(e);
      dispatch(sortByPopulation(e.target.value));
      setCurrentPage(1);
      setOrder(e.target.value);
   }

   function handleFilterContinent(e) {
      e.preventDefault(e);
      dispatch(filterByContinent(e.target.value));
      setCurrentPage(1);
   }
   function handleSortAlp(e) {
      e.preventDefault(e);
      dispatch(sortByAlp(e.target.value));
      setCurrentPage(1);
      setOrder(e.target.value);
   }
   return (
      <div>
         <h1>Welcome to Countries PI</h1>
         <nav>
            <SearchBar setCurrentPage={setCurrentPage} />
            <select>
               <option>By Activity</option>
               <option>Without Activities</option>
               <option>With Activities</option>
            </select>
            <div>
               <select onChange={(e) => handleSortAlp(e)}>
                  <option>Countries Alphabetically</option>
                  <option value='From A-Z'>From A-Z</option>
                  <option value='From Z-A'>From Z-A</option>
               </select>
               <select onChange={(e) => handleSort(e)}>
                  <option>By Population</option>
                  <option value='max'>Max to Min</option>
                  <option value='min'>Min to Max</option>
               </select>
               <select onChange={(e) => handleFilterContinent(e)}>
                  <option value='All'>All</option>
                  <option value='Asia'>Asia</option>
                  <option value='Oceania'>Oceania</option>
                  <option value='Europe'>Europe</option>
                  <option value='North America'>North America</option>
                  <option value='South America'>South America</option>
                  <option value='Antarctic'>Antarctic</option>
                  <option value='Africa'>Africa</option>
               </select>
            </div>
            <div>
               <button onClick={(e) => handleClick(e)}>LOAD COUNTRIES</button>
               <Link to='/form'>
                  <button name='newActivity'>New Activity</button>
               </Link>
            </div>
         </nav>
         <br />
         <div>
            <Page
               countryPerPage={countryPerPage}
               allCountry={allCountry.length}
               paginated={paginated}
            />
         </div>

         <br />
         <div className='home-cards'>
            {currentCountry.length ? (
               currentCountry.map((e) => {
                  return (
                     <div key={e.id}>
                        <Card
                           continent={e.continents}
                           img={e.flags}
                           name={e.name}
                           id={e.id}
                        />
                     </div>
                  );
               })
            ) : (
               <div>Loading...</div>
            )}
         </div>
         {/* <div>
            <Page
               countryPerPage={countryPerPage}
               allCountry={allCountry.length}
               paginated={paginated}
            />
         </div> */}
      </div>
   );
}
