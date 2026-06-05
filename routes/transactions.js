const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../models/transaction");

// Add Transaction
router.post("/add", async (req, res) => {
  try {
    const { userId, title, amount, type, category } = req.body;
    const id = await addTransaction(userId, {
      title,
      amount,
      type,
      category,
    });
    res.json({ msg: "Transaction Added!", id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get All Transactions
router.get("/all/:userId", async (req, res) => {
  try {
    const transactions = await getTransactions(req.params.userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete Transaction
router.delete("/:id", async (req, res) => {
  try {
    await deleteTransaction(req.params.id);
    res.json({ msg: "Transaction Deleted!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
