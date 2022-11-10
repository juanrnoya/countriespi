/** @format */

const { Country, Activity } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config(); //???

const getCountriesb = async (req, res) => {
   const { name } = req.query;
   if (!name) {
      try {
         const allCountries = await Country.findAll({
            include: {
               model: Activity,
               attributes: ["name", "difficulty", "duration", "season"],
               through: { attributes: [] },
            },
         });

         if (!allCountries.length) {
            //si está vacío

            const url = await axios.get("https://restcountries.com/v3/all");

            const apiInfo = await url.data.map((e) => {
               return {
                  id: e.cca3,
                  name: e.name.common,
                  flags: e.flags[1],
                  continents: e.continents[0],
                  capital: e.capital ? e.capital[0] : "Does not exist",
                  subregion: e.subregion ? e.subregion : "Does not exist",
                  area: e.area,
                  population: e.population,
               };
            });
            apiInfo.forEach((z) => {
               Country.findOrCreate({
                  where: {
                     id: z.id,
                     name: z.name,
                     flags: z.flags,
                     continents: z.continents,
                     capital: z.capital,
                     subregion: z.subregion,
                     area: z.area,
                     population: z.population,
                  },
               });
            });
            return res.status(200).send(apiInfo);
         } else {
            return res.status(200).send(allCountries);
         }
      } catch (error) {
         console.log(error);
      }
   } else {
      try {
         const countriesByName = await Country.findAll({
            where: {
               name: { [Op.iLike]: `%${name}%` },
            },
         });
         if (countriesByName.length) {
            return res.status(200).send(countriesByName);
         } else {
            return res.status(404).send({
               error: "Country not found.",
               name: `${name}`,
            });
         }
      } catch (error) {
         console.log(error);
      }
   }
};

const getIdb = async (req, res) => {
   const { id } = req.params;
   const searchId = await Country.findOne({
      where: {
         id,
      },
      include: {
         model: Activity,
         attributes: ["name", "difficulty", "duration", "season"],
         through: { attributes: [] },
      },
   });
   if (searchId) {
      return res.send(searchId);
   } else {
      return res.status(404).send("Id doesnt exists");
   }
};

const getActivityb = async (req, res) => {
   const { name } = req.query;
   if (!name) {
      try {
         const activities = await Activity.findAll({
            include: [
               {
                  model: Country,
                  attributes: ["name"],
                  through: { attributes: [] },
               },
            ],
         });
         return res.status(200).send(activities);
      } catch (error) {
         return res.status(400).send("It doesnt work");
      }
   } else {
      try {
         const countriesByActivity = await Activity.findAll({
            where: {
               name: name,
            },
         });
         if (countriesByActivity.length) {
            return res.status(200).send(countriesByActivity);
         } else {
            return res.status(404).send({
               error: "Activity not Found",
               name: `${name}`,
            });
         }
      } catch (error) {
         console.log(error);
      }
   }
};

const postCountry = async (req, res) => {
   const { name, id, flags, continents, capital, subregion, area, population } =
      req.body;
   try {
      const newCountry = {
         id,
         name,
         flags,
         continents,
         capital,
         subregion,
         area,
         population,
      };
      const createCountry = await Country.create(newCountry);

      Country.addCountry(createCountry);

      return res.status(200).send("Activity created");
   } catch {
      return res.status(404).send(error);
   }
};

const postActivityb = async (req, res) => {
   const { name, difficulty, duration, season, countries } = req.body;

   if (!countries)
      return res.status(404).send({ error: "Please insert a country" });

   //    try {
   //       const activ = await Activity.findOne({
   //          where: {
   //             name,
   //          },
   //          include: {
   //             model: Country,
   //          },
   //       });
   //       console.log("soy activ", activ);

   //       if (!Object.keys(activ)) {
   //          const newActivity = {
   //             name,
   //             difficulty,
   //             duration,
   //             season,
   //          };
   //          const createActivity = await Activity.create(newActivity);

   //          countries.map((e) => {
   //             createActivity.addCountry(e.id);
   //          });

   //          return res.send("Activity created");
   //       } else {
   //          //crea la actividad

   //          //devuelve error

   //          return res.status(404).send({ error: "Activity exists" });
   //       }
   //    } catch (error) {
   //       return res.status(400).send(error);
   //    }
   // };

   //    console.log("soy countries", countries);
   //    console.log("soy country y activity", Country, Activity);
   //    const activ = await Activity.findOne({
   //       where: {
   //          name: name,
   //       },
   //       include: [
   //          {
   //             model: Country,
   //             attributes: ["name"],
   //             through: { attributes: [] },
   //          },
   //       ],
   //    });
   //    console.log("soy activity", activ);
   //    countries.map((e) => {
   //       if (activ && activ.countries.includes(e))
   //          return res
   //             .status(404)
   //             .send("The country" + e + "already includes the activity");
   //    });

   try {
      const activ = await Activity.findOne({
         where: { name },
      });

      if (activ === null) {
         const newActivity = {
            name,
            difficulty,
            duration,
            season,
         };

         const createActivity = await Activity.create(newActivity);

         const findCountry = await Country.findAll({
            where: {
               name: countries,
            },
         });

         createActivity.addCountry(findCountry);
         return res.status(200).send("Activity created");
      } else {
         return res.status(405).send("Activity exists");
      }
   } catch (error) {
      return res.status(400).send(error);
   }
};

module.exports = {
   getCountriesb,
   getIdb,
   postActivityb,
   getActivityb,
   postCountry,
};
