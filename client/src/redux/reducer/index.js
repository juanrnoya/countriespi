/** @format */
const initialState = {
   country: [],
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
      case "FILTER_CONTINENT":
         const allCountries = state.allCountries;
         const CountriesSortedByContinent =
            action.payload === "all"
               ? allCountries
               : allCountries.filter((e) => e.continents === action.payload);

         return {
            ...state,
            country: CountriesSortedByContinent,
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
