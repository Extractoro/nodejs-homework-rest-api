const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contacts = require("../../models/contacts");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({ result, message: "Success", status: 200 });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) res.json({ status: 404, message: "Uncorrect id" });
    return res.json({ result, status: 200 });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "missing fields" });
    }
    contacts.addContact(req.body);
    res.json({ message: "Success", status: 201 });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    contacts.removeContact(contactId);
    res.json({ message: "contact deleted", status: 200 });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "missing fields" });
    }
    contacts.updateContact(req.params.contactId, req.body);
    res.json({ message: "Success", status: 200 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
