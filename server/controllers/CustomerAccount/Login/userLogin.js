const User = require('../../../models/Customers/user');
const redis = require('redis');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});


const userLogin = async (req, res) => {
    try {
        if (!redisClient.isOpen) {
        await redisClient.connect();
        }
    
        const { PhoneNumber, otp } = req.body;
        const storedOtp = await redisClient.get(PhoneNumber);
    
        const decrypted = await bcrypt.compare(otp, storedOtp);
    
        if (decrypted) {
        const user = await User.findOne({ PhoneNumber: PhoneNumber });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        await redisClient.setEx(PhoneNumber, 1800, token);
        res.status(200).json({ message: 'User logged in successfully', token });
        } else {
        res.status(400).json({ message: 'Invalid Otp !! Please enter the correct Otp' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    };


module.exports = userLogin;
