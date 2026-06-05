const admin = require("firebase-admin");
const db = admin.firestore();

const addBudget = async (userId, data) => {
  const ref = await db.collection("budgets").add({
    userId,
    category: data.category,
    totalAmount: data.totalAmount,
    spentAmount: 0,
    month: data.month,
    date: new Date(),
  });
  return ref.id;
};

const getBudgets = async (userId) => {
  const snapshot = await db
    .collection("budgets")
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

module.exports = { addBudget, getBudgets };
