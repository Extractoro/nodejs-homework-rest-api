const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactsById);

router.post("/", controllers.addContact);

router.delete("/:contactId", controllers.deleteContact);

router.put("/:contactId", controllers.updateContact);

module.exports = router;
