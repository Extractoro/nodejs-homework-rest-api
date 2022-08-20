const { subscriptionSchema } = require("../../schema");
const { updateSubcription } = require("../../services/authService");

const updateSubcriptionController = async (req, res, next) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, message: "Missing fields" });
  }

  const { userId } = req.params;

  const result = await updateSubcription(userId, req.body);

  if (!result) throw new Error({ status: 404 });
  res.status(200).json({ status: 200, message: 'Updated success!', data: result})
};

module.exports = updateSubcriptionController;
