import { strictEqual } from "assert";

/** @format */
const initialState = {
   country: [],
   population: [],
   allCountries: [],
   alphabetically: [],
   activity: [],
   detail: {},
};
function rootReducer(state = initialState, action) {
   switch (action.type) {
      case "GET_COUNTRY":
         return {
            ...state,
            country: action.payload,
            allCountries: action.payload,
         };
      case "GET_COUNTRY_DETAIL":
         return {
            ...state,
            detail: action.payload,
         };

      case "FILTER_ACTIVITY":
         const allCountries2 = state.allCountries;

         if (action.payload === "With Activities") {
            var CountriesFilterByActivity = allCountries2.filter(
               (e) => e.activities.length
            );
         } else if (action.payload === "Without Activities") {
            var CountriesFilterByActivity = allCountries2.filter(
               (e) => !e.activities.length
            );
         } else {
            var CountriesFilterByActivity = allCountries2;
         }
         return {
            ...state,
            country: CountriesFilterByActivity,
         };

      case "FILTER_CONTINENT":
         const allCountries = state.allCountries;
         const CountriesFilterByContinent =
            action.payload === "all"
               ? allCountries
               : allCountries.filter((e) => e.continents === action.payload);

         return {
            ...state,
            country: CountriesFilterByContinent,
         };
      case "GET_COUNTRY_BY_NAME":
         return {
            ...state,
            country: action.payload,
         };
      case "SORT_POPULATION":
         const sortPopulation =
            action.payload === "min"
               ? state.country.sort(function (a, b) {
                    if (a.population > b.population) {
                       return 1;
                    }
                    if (b.population > a.population) {
                       return -1;
                    }
                    return 0;
                 })
               : state.country.sort(function (a, b) {
                    if (a.population > b.population) {
                       return -1;
                    }
                    if (b.population > a.population) {
                       return 1;
                    }
                    return 0;
                 });
         return {
            ...state,
            population: sortPopulation,
         };
      case "SORT_ALP":
         const sortAlphabetically =
            action.payload === "From A-Z"
               ? state.country.sort(function (a, b) {
                    if (a.name > b.name) {
                       return 1;
                    }
                    if (b.name > a.name) {
                       return -1;
                    }
                    return 0;
                 })
               : state.country.sort(function (a, b) {
                    if (a.name > b.name) {
                       return -1;
                    }
                    if (b.name > a.name) {
                       return 1;
                    }
                    return 0;
                 });

         return {
            ...state,
            alphabetically: sortAlphabetically,
         };
      default:
         return state;
   }
}
export default rootReducer;
