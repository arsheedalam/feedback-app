const db = require('../db');
const { users } = require('./schema');
const { eq } = require('drizzle-orm');

exports.createUser = async (username, password) => {
  const result = await db.insert(users).values({ username, password }).returning();
  return result[0];
};

exports.findUserByUsername = async (username) => {
  const result = await db.select().from(users).where(eq(users.username, username));
  return result[0];
};