import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Image from "./countries.png";
import { getCountryDetail } from "../../redux/actions/index";

function Detail() {
   const dispatch = useDispatch();
   const params = useParams();
   const { id } = params;
   const countryDetail = useSelector((state) => state.detail);
   useEffect(() => {
      dispatch(getCountryDetail(id));
   }, []);

   return (
      <div
         className='detail'
         style={{
            backgroundImage: `url(${Image})`,
            width: "100%",
            height: "100%",
         }}>
         <div>
            <br />
            <p id='detail-page-title'>COUNTRY DETAIL</p>
            <br />
            <div id='button-detail'>
               <Link to='/home'>
                  <button name='volver' className='button-detail'>
                     Back home!
                  </button>
               </Link>
            </div>
            <div className='card-detail'>
               <div className='card-sub-detail'>
                  <img
                     src={countryDetail.flags}
                     alt='img does not exists'
                     className='card-image'
                     height='200px'
                     width='300x'
                  />
                  <h2>Name: {countryDetail.name}</h2>
                  <h2>ID: {countryDetail.id}</h2>
                  <h3>Continent: {countryDetail.continents}</h3>
                  <h3>Capital: {countryDetail.capital}</h3>
                  <h3>Subregion: {countryDetail.subregion}</h3>
                  <h3>Area: {countryDetail.area}</h3>
                  <h3>Population: {countryDetail.population}</h3>
               </div>
            </div>
            <h2>ACTIVITIES</h2>
            <div className='container-activities'>
               <div>
                  {countryDetail.activities?.map((e) => {
                     return (
                        <div
                           className='activities'
                           key={Math.random()}
                           id='detail-card-div'>
                           <h3>ACTIVITY</h3>

                           <h4>Activity Name:</h4>
                           <p> {e.name}</p>
                           <p>Difficulty : {e.difficulty}</p>
                           <p>Season : {e.season}</p>
                           <p>Duration : {e.duration}</p>
                           <br />
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Detail;
