const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const controllersWrapper = require("../../helpers/controllersWrapper");
const { authMiddleware, upload } = require("../../middlewares");

router.post(
  "/registration",
  controllersWrapper(controllers.registrationController)
);

router.get(
  "/registration_confirm/:code",
  controllersWrapper(controllers.registrationConfirmController)
);

router.post(
  "/verify_again",
  controllersWrapper(controllers.resendConfirmEmailController)
);

router.post("/login", controllersWrapper(controllers.loginController));

router.patch(
  "/:userId",
  controllersWrapper(controllers.updateSubscriptionController)
);

router.use(authMiddleware);

router.get("/logout", controllersWrapper(controllers.logoutController));

router.get("/current", controllersWrapper(controllers.getCurrentController));

router.patch(
  "/users/avatars",
  upload.single("avatar"),
  controllersWrapper(controllers.updateAvatarController)
);

module.exports = router;
