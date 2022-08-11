const service = require("../services/contactsService");
const { favouriteStatus } = require("../schema");

const updateContactStatusController = async (req, res, next) => {
  const { error } = favouriteStatus.validate(req.body);
  if (error) {
    return res.json({ status: 400, message: "Missing fields" });
  }
  const result = await service.updateContactStatus(
    req.params.contactId,
    req.body
  );
  if (!result) res.json({ status: 404 });
  res.json({ message: "Success", status: 200 });
};

module.exports = updateContactStatusController;
