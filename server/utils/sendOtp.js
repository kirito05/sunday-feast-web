const crypto = require("node:crypto");
// const { scrypt, randomFill, createCipheriv } = require("node:crypto");
const bcrypt = require("bcrypt");
const twilio = require("twilio");
const dotenv = require("dotenv");
const redis = require("redis");

dotenv.config();

// Redis Client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// redis connection
redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.log("Error Connecting", err);
});

const sendOtp = async (phoneNumber) => {
  try {
    //check redis connection
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    // OTP Generation and Encryption
    const otp = crypto.randomInt(100000, 999999);
     const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await redisClient.setEx(phoneNumber, 300, hashedOtp);
    // const algorithm = "aes-192-cbc";
    // const key = process.env.CRYPTO_KEY;

    // scrypt(key, "salt", 24, (err, key) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   randomFill(new Uint8Array(16), async (err, iv) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     const cipher = createCipheriv(algorithm, key, iv);

    //     let encrypted = cipher.update(otp.toString(), "utf8", "hex");
    //     encrypted += cipher.final("hex");
    //     await redisClient.setEx(phoneNumber, 300, encrypted);
    //     console.log(encrypted);
    //   });
    // });

    // Twilio Connection
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        body: "Welcome to Grazing Goat. Your Otp is " + otp,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      })
      
      return {success:true}
  } catch (error) {
    console.log("error sending otp",error);
    throw new error("Error sending otp")
  }
};

module.exports = sendOtp;
