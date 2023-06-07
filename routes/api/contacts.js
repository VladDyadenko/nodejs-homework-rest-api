const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const authanticate = require("../../middlewares/authanticate");

router.get("/", authanticate, ctrl.getAll);

router.get("/:contactId", authanticate, isValidId, ctrl.getById);

router.post("/", authanticate, validateBody(schemas.addSchema), ctrl.post);

router.delete("/:contactId", authanticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  authanticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authanticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
