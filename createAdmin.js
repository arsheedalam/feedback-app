require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./db');
const { users } = require('./models/schema');
const { eq } = require('drizzle-orm');

async function createAdmin() {
  try {

    // Check if admin already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.username, 'admin'));

    if (existing.length > 0) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const result = await db.insert(users).values({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    }).returning();

    console.log("Admin created:", result[0]);

    process.exit();

  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();