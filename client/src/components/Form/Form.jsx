/** @format */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newActivity, getCountries } from "../../redux/actions";
import FormCard from "../FormCard/FormCard";

import Image from "./countries.png";

const Form = () => {
   const dispatch = useDispatch();
   const history = useHistory();

   const allCountry = useSelector((state) => state.country); /**idea orderer*/

   const [formValues, setFormValues] = useState({
      countries: [],
      name: "",
      difficulty: "",
      duration: "",
      season: "",
   });

   const [errors, setErrors] = useState({
      countries: ["Choose a country"],
      name: "Activity name must be a string",
      difficulty: "Choose a difficulty from 1 to 5",
      duration: "Choose a duration from 1 to 24",
      season: "Choose a season",
   });

   useEffect(() => {
      dispatch(getCountries());
   }, [dispatch]);

   useEffect(() => console.log(), []);

   // console.group();
   // console.table("FORMVALUES", formValues);
   // console.groupEnd();

   // console.group();
   // console.log("ERRORS", errors);
   // console.groupEnd();

   function validate(form) {
      let error = {};
      if (form.countries.length === 0) {
         error.countries = "Choose a country";
      }
      if (!form.name) {
         error.name = "Activity name must be a string";
      }
      if (!form.difficulty) {
         // alert("Difficulty must be from 1 to 5");
         error.difficulty = "Choose a difficulty from 1 to 5";
      }
      if (!form.duration) {
         // alert("Duration must be from 1 to 24");
         error.duration = "Choose a duration from 1 to 24";
      }

      if (!form.season) {
         error.season = "Choose a season";
      }

      return error;
   }

   const onSubmit = (e) => {
      e.preventDefault(e);

      if (!Object.entries(errors).length) {
         dispatch(newActivity(formValues));

         setFormValues({
            countries: [],
            name: "",
            difficulty: "",
            duration: "",
            season: "",
         });
         alert("Activity Created Succesfully in: " + formValues.countries);
         history.push("/home");
      } else {
         let e = Object.values(errors);
         alert(JSON.stringify("Please correct: " + e));
      }
   };

   function handleSelect(e) {
      if (!formValues.countries.includes(e.target.value)) {
         setFormValues({
            ...formValues,
            countries: [...formValues.countries, e.target.value],
         });
         setErrors(
            validate({
               ...formValues,
               countries: [...formValues.countries, e.target.value],
            })
         );
      }
   }

   function handleDelete(e) {
      setFormValues({
         ...formValues,
         countries: [
            ...formValues.countries.filter((c) => c !== e.target.value),
         ],
      });
      setErrors(
         validate({
            ...formValues,
            countries: [
               ...formValues.countries.filter((c) => c !== e.target.value),
            ],
         })
      );
   }

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
                           name='countries'
                           onChange={(e) => handleSelect(e)}>
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
            <div className='form-card-container'>
               {formValues.countries.length ? (
                  formValues.countries.map((e) => {
                     return (
                        <div className='formcard' key={Math.random()}>
                           <div>
                              <button
                                 className='formcardbuttondelete'
                                 name='countries'
                                 value={e}
                                 onClick={(e) => handleDelete(e)}>
                                 X
                              </button>
                           </div>
                           <FormCard name={e} />
                        </div>
                     );
                  })
               ) : (
                  <div>Waiting for countries...</div>
               )}
            </div>

            <br />
            <button name='Send' className='button-form' type='submit'>
               CREATE
            </button>
         </form>
      </div>
   );
};

export default Form;
