const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers/HttpError");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not faund");
  } else {
    res.status(200).json({
      message: "Delete success",
    });
  }
};

module.exports = deleteById;
