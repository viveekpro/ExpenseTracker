const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      emun: [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Rent",
        "Entertainment",
        "Health",
        "Education",
        "Other"
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    expense_mode: {
      type: String,
      required: true,
      enum: ["Online", "Cash", "Card","Other"],
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Expense", expenseSchema);