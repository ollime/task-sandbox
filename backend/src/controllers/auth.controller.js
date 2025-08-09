import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = awaitUser.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token."
    );
  }
};

// registering a user
const registerUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const user = new User({ username });

    await user.save();

    try {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      res.status(201).json({
        message: "User registered successfully.",
        accessToken,
        refreshToken,
        user: {
          username: user.username,
        },
      });
    } catch (tokenError) {
      console.log("Token generation error:" + tokenError);
      res.status(201).json({
        message: "User registered successfully. (Token generation failed)",
        user: {
          username: user.username,
        },
      });
    }
  } catch (err) {
    console.error("Register error: " + err);
    res.status(500).json({ message: "Server error." });
  }
};

export { registerUser };
