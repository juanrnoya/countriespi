/** @format */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newActivity, getCountries } from "../../redux/actions";

import Image from "./countries.png";

export function validate(form) {
   let errors = {};
   if (!form.name) {
      errors.name = "Name is required";
   }
   if (!form.difficulty) {
      errors.difficulty = "Choose a difficulty over 0";
   }
   if (!form.duration) {
      errors.duration = "Choose a duration over 0";
   }
   if (!form.countries) {
      errors.countries = "Choose a country";
   }
   if (!form.season) {
      errors.season = "Choose a season";
   }

   return errors;
}

const Form = () => {
   const [formValues, setFormValues] = useState({
      countries: "",
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
   });
   console.log(formValues);
   const dispatch = useDispatch();
   const history = useHistory();
   const allCountry = useSelector((state) => state.country); /**idea orderer*/
   const [errors, setErrors] = useState({});

   useEffect(() => {
      dispatch(getCountries());
   }, [dispatch]);

   const onSubmit = (e) => {
      e.preventDefault(e);

      setErrors(validate(formValues));

      if (Object.keys(errors).length === 0) {
         dispatch(newActivity(formValues));

         setFormValues({
            countries: "",
            name: "",
            difficulty: 0,
            duration: 0,
            season: "",
         });
         alert("Activity Created Succesfully");
         history.push("/home");
      } else {
         alert("There are empty fields");
      }
   };

   const handleInputChange = (e) => {
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
                           required
                           name='countries'
                           onChange={(e) => handleInputChange(e)}>
                           <option value={"All"}>---</option>
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
                           max={5}
                           min={1}></input>
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
                           size='25'
                           type='range'
                           max={24}
                           min={1}></input>
                        <label>{" " + formValues.duration}</label>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Season: </label>
                     </td>
                     <td>
                        <select
                           name='season'
                           onChange={(e) => handleInputChange(e)}>
                           <option value={""}>---</option>
                           <option type='text' value='Summer'>
                              Summer
                           </option>
                           <option type='text' value='Spring'>
                              Spring
                           </option>
                           <option type='text' value='Winter'>
                              Winter
                           </option>
                           <option type='text' value='Autumn'>
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
