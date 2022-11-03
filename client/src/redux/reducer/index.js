import { strictEqual } from "assert";

/** @format */
const initialState = {
   country: [],
   activity: [],
   population: [],
   allCountries: [],
   alphabetically: [],
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

      case "FILTER_BY_ACTIVITY":
         const allActivities = state.activity;
         const CountriesFilterByActivity =
            action.payload === "All activities"
               ? allActivities
               : allActivities.filter((e) =>
                    e.countries.includes(action.payload)
                 );
         return {
            ...state,
            countries: CountriesFilterByActivity,
         };

      case "FILTER_CONTINENT":
         const allCountries = state.allCountries;
         const CountriesFilterByContinent =
            action.payload === "All Continents"
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
