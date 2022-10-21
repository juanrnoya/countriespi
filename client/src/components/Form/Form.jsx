/** @format */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newActivity } from "../../redux/actions";

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
      <div>
         <form onSubmit={onSubmit}>
            <table align='center' border='1' bgcolor='lightblue' width='400'>
               <caption bgcolor='darkblue'>
                  <marquee
                     direction='down'
                     width='500'
                     height='200'
                     behavior='alternate'>
                     <marquee behavior='alternate'>
                        <h1>Add New Activity</h1>{" "}
                     </marquee>
                  </marquee>
               </caption>
               <br />
               <tr bgcolor='lightblue'>
                  <td>
                     <label>Country Name: </label>
                  </td>
                  <td>
                     <select onChange={handleInputChange}>
                        {allCountry.map((e) => (
                           <option value={e.name} name='countries' key={e.id}>
                              {e.name}
                           </option>
                        ))}
                     </select>
                  </td>
               </tr>
               <tr bgcolor='lightblue'>
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
               <tr bgcolor='lightblue'>
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
               <tr bgcolor='lightblue'>
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
               <tr bgcolor='lightblue'>
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
            </table>
            <br />
            <hr />
            <br />
            <button name='Send' className='btn' type='submit'>
               CREATE
            </button>
         </form>
      </div>
   );
};

export default Form;
