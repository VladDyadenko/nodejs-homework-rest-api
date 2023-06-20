const expresse = require("express");
const router = expresse.Router();
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const { schemas } = require("../../models/user");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.get("/users/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/users/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
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
router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
