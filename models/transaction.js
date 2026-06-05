const admin = require("firebase-admin");
const db = admin.firestore();

const addTransaction = async (userId, data) => {
  const ref = await db.collection("transactions").add({
    userId,
    title: data.title,
    amount: data.amount,
    type: data.type,
    category: data.category,
    date: new Date(),
  });
  return ref.id;
};

const getTransactions = async (userId) => {
  const snapshot = await db
    .collection("transactions")
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const deleteTransaction = async (id) => {
  await db.collection("transactions").doc(id).delete();
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
};
