const expresse = require("express");
const router = expresse.Router();
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/user");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/users/logout", authenticate, ctrl.logout);
router.get("/users/current", authenticate, ctrl.getCurrent);
router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);
module.exports = router;
