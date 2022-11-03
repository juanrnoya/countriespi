/** @format */
//It could be in different route files
const router = require("express").Router();
const {
   getCountries,
   getId,
   postActivity,
   getActivity,
} = require("../controllers/country");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/countries", getCountries);
router.get("/countries/:id", getId);
router.get("/activities", getActivity);
router.post("/activities", postActivity);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
