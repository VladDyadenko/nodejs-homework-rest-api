const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const post = require("./post");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  post: ctrlWrapper(post),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
