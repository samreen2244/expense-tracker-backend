const admin = require("firebase-admin");

const createUser = async (userData) => {
  const user = await admin.auth().createUser({
    email: userData.email,
    password: userData.password,
    displayName: userData.name,
  });
  return user;
};

module.exports = { createUser };
