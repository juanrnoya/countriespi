/** @format */
import React from "react";

export default function Page({ countryPerPage, paginated, allCountry }) {
   const pageNumber = [];
   for (let i = 1; i <= Math.ceil(allCountry / countryPerPage); i++) {
      pageNumber.push(i);
   }
   return (
      <nav>
         <ul>
            {pageNumber &&
               pageNumber.map((e) => (
                  <fragment key={e}>
                     <button
                        className='button-page'
                        onClick={() => paginated(e)}>
                        {e}
                     </button>
                  </fragment>
               ))}
         </ul>
      </nav>
   );
}
