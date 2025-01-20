const User = require("../../../models/Customers/user");
const redis = require("redis");
const dotenv = require("dotenv");
// const crypto = require("node:crypto");
// const { scryptSync, createDecipheriv } = require("node:crypto");
// const { Buffer } = require("node:buffer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

const userRegister = async (req, res) => {
  try {
    // redis client connection check
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const { Name, PhoneNumber, otp } = req.body;
    const storedOtp = await redisClient.get(PhoneNumber);

    const decrypted = await bcrypt.compare(otp, storedOtp);

    // const algorithm = "aes-192-cbc";
    // const password = process.env.CRYPTO_KEY;

    // const key = scryptSync(password, "salt", 24);

    // const iv = Buffer.alloc(16, 0);
    // const decipher = createDecipheriv(algorithm, key, iv);
    // let decrypted = decipher.update(storedOtp, "hex", "utf8");
    // decrypted += decipher.final("utf8");

    if (decrypted) {
      const newUser = User.create({
        Name: Name,
        PhoneNumber: PhoneNumber,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      await redisClient.setEx(PhoneNumber, 1800, token);
      res.status(200).json({ message: "User Registered Successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Invalid Otp !! Please enter the correct Otp" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = userRegister;
