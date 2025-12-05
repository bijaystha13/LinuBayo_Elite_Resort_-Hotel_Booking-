import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cardHolderName: {
      type: String,
      required: true,
      trim: true,
    },

    cardNumber: {
      type: String,
      required: true,
      minlength: 12,
      maxlength: 19,
    },

    expiryMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    expiryYear: {
      type: Number,
      required: true,
    },

    cvv: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 4,
    },

    cardType: {
      type: String,
      enum: ["Visa", "MasterCard", "AMEX", "Discover", "Other"],
      default: "Other",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Optional: prevent showing sensitive info when sending API response
creditCardSchema.methods.toJSON = function () {
  const card = this.toObject();
  delete card.cvv;
  return card;
};

export default mongoose.model("CreditCard", creditCardSchema);
