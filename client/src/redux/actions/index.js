/** @format */
import axios from "axios";
import { $CombinedState } from "redux";

export function getCountries() {
   return async function (dispatch) {
      let call = await axios("http://localhost:3001/countries");
      return dispatch({
         type: "GET_COUNTRY",
         payload: call.data,
      });
   };
}

export function getCountryByName(payload) {
   console.log(payload);
   return async function (dispatch) {
      try {
         let country = await axios(
            `http://localhost:3001/countries?name=${payload}`
         );
         return dispatch({
            type: "GET_COUNTRY_BY_NAME",
            payload: country.data,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function sortByPopulation(payload) {
   console.log("soy payload population, ", payload);
   return {
      type: "SORT_POPULATION",
      payload,
   };
}

export function filterByContinent(payload) {
   console.log("soy payload continent, ", payload);
   return {
      type: "FILTER_CONTINENT",
      payload,
   };
}
export function sortByAlp(payload) {
   console.log("soy payload Alp, ", payload);
   return {
      type: "SORT_ALP",
      payload,
   };
}

export function newActivity(payload) {
   return async function () {
      try {
         console.log("Soy newActivity payload, ", payload);
         const answer = await axios.post(
            "http://localhost:3001/activities",
            payload
         );
         return answer;
      } catch (error) {
         console.log(error);
      }
   };
}
