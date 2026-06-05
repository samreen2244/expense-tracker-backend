const express = require("express");
const router = express.Router();
const { addBudget, getBudgets } = require("../models/budget");

// Add Budget
router.post("/add", async (req, res) => {
  try {
    const { userId, category, totalAmount, month } = req.body;
    const id = await addBudget(userId, {
      category,
      totalAmount,
      month,
    });
    res.json({ msg: "Budget Added!", id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get All Budgets
router.get("/all/:userId", async (req, res) => {
  try {
    const budgets = await getBudgets(req.params.userId);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
