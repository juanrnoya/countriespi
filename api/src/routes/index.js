/** @format */
//It could be in different route files
const router = require("express").Router();
const {
   getCountriesb,
   getIdb,
   postActivityb,
   getActivityb,
} = require("../controllers/country");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/countries", getCountriesb);
router.get("/countries/:id", getIdb);
router.get("/activities", getActivityb);
router.post("/activities", postActivityb);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
