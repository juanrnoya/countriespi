import { strictEqual } from "assert";

/** @format */
const initialState = {
   country: [],
   activity: [],
   population: [],
   allCountries: [],
   allCountriesByActivity: [],
   alphabetically: [],
   detail: [],
};

function rootReducer(state = initialState, action) {
   switch (action.type) {
      case "GET_COUNTRY":
         return {
            ...state,
            country: action.payload,
            allCountries: action.payload,
         };
      case "GET_ACTIVITY":
         return {
            ...state,
            activity: action.payload,
            detail: action.payload,
         };
      case "GET_COUNTRY_DETAIL":
         return {
            ...state,
            detail: action.payload,
         };

      case "FILTER_BY_ACTIVITY":
         const allCountriesByActivity = state.allCountriesByActivity;
         const CountriesFilterByActivity =
            action.payload === "All activities"
               ? allCountriesByActivity
               : allCountriesByActivity.filter((e) =>
                    e.activities.includes(action.payload)
                 );
         return {
            ...state,
            name: CountriesFilterByActivity,
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
