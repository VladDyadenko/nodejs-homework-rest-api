const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers/HttpError");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not faund");
  }
  res.json(result);
};

module.exports = getById;
