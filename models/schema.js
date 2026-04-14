const { pgTable, serial, text, integer, timestamp } = require('drizzle-orm/pg-core');

exports.users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').default('user')
});

exports.feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => exports.users.id)
    .notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});