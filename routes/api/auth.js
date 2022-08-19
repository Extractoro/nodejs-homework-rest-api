const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const controllersWrapper = require("../../helpers/controllersWrapper");

router.post(
  "/registration",
  controllersWrapper(controllers.registrationController)
);

router.post("/login", controllersWrapper(controllers.loginController));

module.exports = router;
