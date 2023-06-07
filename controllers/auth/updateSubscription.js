const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
      projection: { email: 1, subscription: 1 },
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
module.exports = updateSubscription;
