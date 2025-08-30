import { executeQuery } from "./database";
import { User } from "@/types/auth";
import { jwtService } from "./jwtService";

class UserService {
  async getUserByPhone(phone: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE phone = ?";
    const result = await executeQuery<User[]>(query, [phone]);
    return result?.[0] || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const result = await executeQuery<User[]>(query, [email]);
    return result?.[0] || null;
  }

  async createUser(
    phone: string,
    email?: string,
    firstName?: string,
    lastName?: string
  ): Promise<User> {
    const query = `
      INSERT INTO users (phone, email, first_name, last_name) 
      VALUES (?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [
      phone,
      email,
      firstName,
      lastName,
    ]);
    const userId = (result as any).insertId;

    return this.getUserById(userId) as Promise<User>;
  }

  async createUserWithDetails(userData: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
  }): Promise<User> {
    const [firstName, ...lastNameParts] = userData.name.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    const query = `
      INSERT INTO users (phone, email, first_name, last_name, date_of_birth, gender) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [
      userData.phone,
      userData.email,
      firstName,
      lastName,
      userData.dateOfBirth,
      userData.gender,
    ]);
    const userId = (result as any).insertId;

    return this.getUserById(userId) as Promise<User>;
  }

  async getUserById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await executeQuery<User[]>(query, [id]);
    return result?.[0] || null;
  }

  async updatePhoneVerification(userId: number): Promise<void> {
    const query = `
      UPDATE users 
      SET phone_verified = TRUE, phone_verified_at = NOW() 
      WHERE id = ?
    `;

    await executeQuery(query, [userId]);
  }

  async updateLastLogin(userId: number): Promise<void> {
    const query = `
      UPDATE users 
      SET last_login_at = NOW() 
      WHERE id = ?
    `;

    await executeQuery(query, [userId]);
  }

  async storeUserSession(
    userId: number,
    tokenHash: string,
    expiresAt: Date
  ): Promise<void> {
    const query = `
      INSERT INTO user_sessions (user_id, token_hash, expires_at) 
      VALUES (?, ?, ?)
    `;

    await executeQuery(query, [userId, tokenHash, expiresAt]);
  }

  async validateUserSession(
    userId: number,
    tokenHash: string
  ): Promise<boolean> {
    const query = `
      SELECT COUNT(*) as count 
      FROM user_sessions 
      WHERE user_id = ? AND token_hash = ? AND expires_at > NOW()
    `;

    const result = await executeQuery<{ count: number }[]>(query, [
      userId,
      tokenHash,
    ]);
    return (result?.[0]?.count || 0) > 0;
  }

  async logoutUser(userId: number, tokenHash: string): Promise<void> {
    const query = `
      DELETE FROM user_sessions 
      WHERE user_id = ? AND token_hash = ?
    `;

    await executeQuery(query, [userId, tokenHash]);
  }

  async updateUserStatus(userId: number, status: number): Promise<void> {
    const query = `
      UPDATE users 
      SET status = ? 
      WHERE id = ?
    `;

    await executeQuery(query, [status, userId]);
  }
}

export const userService = new UserService();
