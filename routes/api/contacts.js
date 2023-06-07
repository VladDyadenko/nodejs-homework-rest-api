const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.post);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
