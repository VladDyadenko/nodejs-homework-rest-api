const expresse = require("express");
const router = expresse.Router();
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/user");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);
module.exports = router;
