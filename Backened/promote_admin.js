import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./Models/User.js";

dotenv.config();

const promoteToAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { role: "admin" },
            { new: true }
        );

        if (user) {
            console.log(`🚀 Successfully promoted ${email} to ADMIN!`);
            console.log("User details:", { id: user._id, email: user.email, role: user.role });
        } else {
            console.log(`❌ User with email ${email} not found.`);
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

// Get email from command line argument
const emailArg = process.argv[2];

if (!emailArg) {
    console.log("Usage: node promote_admin.js <user_email>");
    process.exit(1);
}

promoteToAdmin(emailArg);
