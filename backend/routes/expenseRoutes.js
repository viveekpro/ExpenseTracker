const express = require("express");

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController")

const protect = require("../middleware/authMiddleware")

const router = express.Router();

// every expense rotue requires login
router.use(protect);

// post - create expense
router.post("/", createExpense);

// get - all expenses
router.get("/", getExpenses);

// get - single expense
router.get("/:id",getExpenseById);

// put - update expense
router.put("/:id", updateExpense);

// delete - delete expense
router.delete("/:id", deleteExpense);


module.exports = router;