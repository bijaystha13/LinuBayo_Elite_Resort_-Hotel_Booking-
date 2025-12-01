import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },

  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
