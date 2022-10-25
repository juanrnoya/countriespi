/** @format */
import React, { Fragment } from "react";

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
                  <Fragment key={e}>
                     <button
                        className='button-page'
                        onClick={() => paginated(e)}>
                        {e}
                     </button>
                  </Fragment>
               ))}
         </ul>
      </nav>
   );
}
