const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = require("../controllers/auth/login");

jest.mock("../models/user", () => ({
  User: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("test login function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("response status - 200, token and user object with email and subscription fields are returned", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password",
      },
    };

    const user = {
      _id: "user_id",
      email: "test@example.com",
      password: "password",
      subscription: "starter",
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mocked_token");
    User.findByIdAndUpdate.mockResolvedValue();

    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "mocked_token",
      user: {
        email: "test@example.com",
        subscription: "starter",
      },
    });
  });
});
