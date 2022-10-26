/** @format */
import axios from "axios";
//import { $CombinedState } from "redux";

export function getCountries() {
   return async function (dispatch) {
      let call = await axios("http://localhost:3001/countries");
      return dispatch({
         type: "GET_COUNTRY",
         payload: call.data,
      });
   };
}

export function getActivities() {
   return async function (dispatch) {
      let call = await axios("http://localhost:3001/activities");
      return dispatch({
         type: "FILTER_ACTIVITY",
         payload: call.data,
      });
   };
}
export function filterByActivity(payload) {
   return {
      type: "FILTER_ACTIVITY",
      payload,
   };
}
export function getCountryByName(payload) {
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
   return {
      type: "SORT_POPULATION",
      payload,
   };
}

export function filterByContinent(payload) {
   return {
      type: "FILTER_CONTINENT",
      payload,
   };
}

export function sortByAlp(payload) {
   return {
      type: "SORT_ALP",
      payload,
   };
}

export function newActivity(payload) {
   return async function () {
      try {
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
