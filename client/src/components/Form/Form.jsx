/** @format */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newActivity, getCountries } from "../../redux/actions";

import Image from "./countries.png";

const Form = () => {
   const dispatch = useDispatch();
   const history = useHistory();

   const [formValues, setFormValues] = useState({
      countries: "",
      name: "",
      difficulty: "",
      duration: "",
      season: "",
   });

   const [errors, setErrors] = useState({});
   const allCountry = useSelector((state) => state.country); /**idea orderer*/

   function validate(form) {
      let error = {};
      if (!form.countries) {
         error.countries = "Choose a country";
      }
      if (!/w/.test(form.name)) {
         error.name = "Activity name must be a string";
      }
      if (!form.difficulty || form.difficulty < 1 || form.difficulty > 6) {
         // alert("Difficulty must be from 1 to 5");
         error.difficulty = "Choose a difficulty from 1 to 5";
      }
      if (!form.duration || form.duration < 1 || form.duration > 24) {
         // alert("Duration must be from 1 to 24");
         error.duration = "Choose a duration from 1 to 24";
      }

      if (!form.season) {
         error.season = "Choose a season";
      }

      return error;
   }

   useEffect(() => {
      dispatch(getCountries());
   }, [dispatch]);

   // useEffect(() => console.log(), []);

   // console.group();
   // console.table("FORMVALUES", formValues);
   // console.groupEnd();

   // console.group();
   // console.log("ERRORS", errors);
   // console.groupEnd();

   const onSubmit = (e) => {
      e.preventDefault(e);

      if (Object.entries(errors).length === 0) {
         dispatch(newActivity(formValues));

         setFormValues({
            countries: "",
            name: "",
            difficulty: "",
            duration: "",
            season: "",
         });
         alert("Activity Created Succesfully");
         history.push("/home");
      } else {
         let e = Object.values(errors);
         alert(JSON.stringify("Please correct: " + e));
      }
   };

   const handleInputChange = (e) => {
      setErrors(
         validate({
            ...formValues,
            [e.target.name]: e.target.value,
         })
      );

      setFormValues({
         ...formValues,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div
         className='home'
         style={{
            backgroundImage: `url(${Image})`,
            width: "100%",
            height: "1000px",
         }}>
         <div id='title-home'>COUNTRIES APP</div>
         <br />

         <div id='button-detail'>
            <Link to='/home'>
               <button name='volver' className='button-detail'>
                  Back home!
               </button>
            </Link>
         </div>
         <form onSubmit={onSubmit}>
            <div id='container-h2-form-page'>
               <p id='h2-form-page'> ADD NEW ACTIVITY</p>
            </div>

            <table align='center'>
               <tbody>
                  <tr>
                     <td>
                        <label>Country Name: </label>
                     </td>
                     <td>
                        <select
                           value={formValues.countries}
                           required
                           name='countries'
                           onChange={(e) => handleInputChange(e)}>
                           <option value={""}></option>
                           {allCountry.map((e) => (
                              <option type='text' value={e.name} key={e.id}>
                                 {e.name}
                              </option>
                           ))}
                        </select>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Activity Name: </label>
                     </td>
                     <td>
                        <input
                           required
                           value={formValues.name}
                           onChange={handleInputChange}
                           name='name'
                           size='25'
                           type='text'
                           placeholder='Type the name of the activity'></input>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Difficulty 1-5: </label>
                     </td>
                     <td>
                        <input
                           required
                           value={formValues.difficulty}
                           onChange={handleInputChange}
                           name='difficulty'
                           size='25'
                           type='range'
                           max='5'
                           min='1'></input>
                        <label>{" " + formValues.difficulty}</label>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Duration 1-24: </label>
                     </td>
                     <td>
                        <input
                           required
                           value={formValues.duration}
                           onChange={handleInputChange}
                           name='duration'
                           type='range'
                           max='24'
                           min='1'
                           size='25'></input>
                        <label>{" " + formValues.duration}</label>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Season: </label>
                     </td>
                     <td>
                        <select
                           required
                           value={formValues.season}
                           name='season'
                           onChange={(e) => handleInputChange(e)}>
                           <option value={""}></option>
                           <option type='text' value={formValues.summer}>
                              Summer
                           </option>
                           <option type='text' value={formValues.spring}>
                              Spring
                           </option>
                           <option type='text' value={formValues.winter}>
                              Winter
                           </option>
                           <option type='text' value={formValues.autumn}>
                              Autumn
                           </option>
                        </select>
                     </td>
                  </tr>
               </tbody>
            </table>
            <br />
            <br />
            <button name='Send' className='button-form' type='submit'>
               CREATE
            </button>
         </form>
      </div>
   );
};

export default Form;
