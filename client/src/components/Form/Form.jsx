/** @format */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newActivity, getCountries } from "../../redux/actions";

import Image from "./countries.png";

// export function validate(form) {
//    let errors = {};
//    if (
//       !form.countries ||
//       !form.name ||
//       !form.difficulty ||
//       !form.duration ||
//       !form.season
//    ) {
//       errors.name = "error";

//       // } else if (!/\S+@\S+\.\S+/.test(form.username)) {
//       //    errors.name = "Username is invalid";
//       // }
//    } else {
//       console.log("formulario no vacio");
//    }
//    return errors;
// }

const Form = () => {
   const [formValues, setFormValues] = useState({
      countries: "",
      name: "",
      difficulty: "",
      duration: "",
      season: "",
   });

   const dispatch = useDispatch();
   const history = useHistory();
   const allCountry = useSelector((state) => state.country); /**idea orderer*/
   const [errors, setErrors] = useState({});
   useEffect(() => {
      dispatch(getCountries());
   }, [dispatch]);

   const onSubmit = (e) => {
      if (Object.entries(errors).length === 0) {
         e.preventDefault(e);
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
         alert("hay campos vacios");
      }
   };

   const handleInputChange = (e) => {
      setFormValues({
         ...formValues,
         [e.target.name]: e.target.value,
      });

      // validate(formValues);
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
                           onChange={handleInputChange}>
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
                        <label>Difficulty: </label>
                     </td>
                     <td>
                        <input
                           required
                           value={formValues.difficulty}
                           onChange={handleInputChange}
                           name='difficulty'
                           size='25'
                           type='text'
                           placeholder='Difficulty from 1-5'></input>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Duration: </label>
                     </td>
                     <td>
                        <input
                           required
                           value={formValues.duration}
                           onChange={handleInputChange}
                           name='duration'
                           size='25'
                           type='text'
                           placeholder='How long it takes'></input>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Season: </label>
                     </td>
                     <td>
                        <input
                           required
                           value={formValues.season}
                           onChange={handleInputChange}
                           name='season'
                           size='25'
                           type='text'
                           placeholder='Reasonable season to enjoy'></input>
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
