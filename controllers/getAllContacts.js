const getData = require("../services/dataLayer");

const getAllContacts = async (_, res, next) => {
  try {
    const result = await getData();
    res.json({ result, message: "Success", status: 200 });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
