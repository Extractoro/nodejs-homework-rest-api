const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const controllersWrapper = require("../../helpers/controllersWrapper");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", controllersWrapper(controllers.getAllContactsController));

router.get(
  "/:contactId",
  controllersWrapper(controllers.getContactsByIdController)
);

router.post("/", controllersWrapper(controllers.addContactController));

router.delete(
  "/:contactId",
  controllersWrapper(controllers.deleteContactController)
);

router.put(
  "/:contactId",
  controllersWrapper(controllers.updateContactController)
);

router.patch(
  "/:contactId/favorite",
  controllersWrapper(controllers.updateContactStatusController)
);

module.exports = router;
