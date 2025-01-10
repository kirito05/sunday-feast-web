const Member = require("../../models/Admin/member");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

// Admin registration
const AdminRegister = async (req, res) => {
  try {
    const { Name, Email, Password, PhoneNumber } = req.body;

    const ExistingEmail = await Member.findOne({ Email: Email });
    if (ExistingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(Password, 12);
      generateAdminId = crypto.randomBytes(5).toString("hex");
      const newAdmin = new Member({
        AdminId: generateAdminId,
        Name: Name,
        Email: Email,
        Password: hashedPassword,
        PhoneNumber: PhoneNumber,
      });
      await newAdmin.save();
      return res
        .status(200)
        .json({ message: "Admin registered successfully" , adminId:newAdmin.AdminId});
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

module.exports = AdminRegister;
