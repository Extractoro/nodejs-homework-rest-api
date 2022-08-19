const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const controllersWrapper = require("../../helpers/controllersWrapper");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post(
  "/registration",
  controllersWrapper(controllers.registrationController)
);

router.post("/login", controllersWrapper(controllers.loginController));

router.use(authMiddleware);

router.get("/logout", controllersWrapper(controllers.logoutController));

router.get("/current", controllersWrapper(controllers.getCurrentController));

module.exports = router;
