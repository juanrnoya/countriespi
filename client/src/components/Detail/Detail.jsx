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
      console.log(countryDetail);
   }, []);

   return (
      <div
         className='detail'
         style={{
            backgroundImage: `url(${Image})`,
            width: "100%",
            height: "1000px",
         }}>
         <Link to='/home'>
            <button name='volver' className='button-detail'>
               Go home!
            </button>
         </Link>
         <p id='h1-detail-page'>COUNTRY DETAIL</p>

         <br />
         <div className='card-detail'>
            <div className='card-sub-detail'>
               <img
                  src={countryDetail.flags}
                  alt='img does not exists'
                  className='card-image'
                  height='200px'
                  width='300x'
               />
               <h2>{countryDetail.name}</h2>

               <h3>{countryDetail.continents}</h3>
            </div>
         </div>
         <h2>Detalle de Actividades</h2>
         <div className='container-activities'>
            {countryDetail.activities?.map((e) => {
               return (
                  <div
                     className='activities'
                     key={Math.random()}
                     id='detail-card-div'>
                     <h3>Actividad</h3>

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
   );
}

export default Detail;
