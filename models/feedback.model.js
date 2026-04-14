const db = require('../db');
const { feedback } = require('./schema');
const { eq, and } = require('drizzle-orm');

exports.createFeedback = async (userId, message) => {
  const result = await db.insert(feedback).values({
    userId,
    message
  }).returning();

  return result[0];
};

exports.getFeedbackByUser = async (userId) => {
  return await db.select().from(feedback).where(eq(feedback.userId, userId));
};

exports.updateFeedback = async (id, userId, message) => {
  const result = await db
    .update(feedback)
    .set({
      message,
      updatedAt: new Date()
    })
    .where(and(eq(feedback.id, id), eq(feedback.userId, userId)))
    .returning();

  return result[0];
};

exports.deleteFeedback = async (id, userId) => {
  const result = await db
    .delete(feedback)
    .where(and(eq(feedback.id, id), eq(feedback.userId, userId)))
    .returning();

  return result[0];
};

exports.getAllFeedback = async () => {
  return await db.select().from(feedback);
};