/** @format */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newActivity } from "../../redux/actions";
import Image from "./countries.png";

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

   const onSubmit = (e) => {
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
      history.push("/");
   };

   const handleInputChange = (e) => {
      const changedFormValues = {
         ...formValues,
         [e.target.name]: e.target.value,
      };
      setFormValues(changedFormValues);
   };

   return (
      <div
         className='home'
         style={{
            backgroundImage: `url(${Image})`,
            width: "100%",
            height: "1000px",
         }}>
         <div className='header-form'></div>
         <form onSubmit={onSubmit}>
            <h1 id='h1-form-page'> ADD NEW ACTIVITY</h1>
            <table align='center'>
               <caption>
                  {/* <marquee
                     direction='down'
                     width='450'
                     height='150'
                     behavior='alternate'
                     bgcolor='lightblue'>
                     <marquee behavior='alternate'>
                        <h1>Add New Activity</h1>{" "}
                     </marquee>
                  </marquee> */}
               </caption>
               <tbody>
                  <tr>
                     <td>
                        <label>Country Name: </label>
                     </td>
                     <td>
                        <select onChange={handleInputChange}>
                           {allCountry.map((e) => (
                              <option
                                 value={e.name}
                                 name='countries'
                                 key={e.id}>
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
                        <label>Difficulty: </label>
                     </td>
                     <td>
                        <input
                           value={formValues.difficulty}
                           onChange={handleInputChange}
                           name='difficulty'
                           size='25'
                           type='text'
                           placeholder='Level of difficulty from 1-5'></input>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label>Duration: </label>
                     </td>
                     <td>
                        <input
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
            <button name='Send' className='button-form' type='submit'>
               CREATE
            </button>
         </form>
      </div>
   );
};

export default Form;
