import { executeQuery } from "./database";
import { PaymentOrder, Membership, PaymentStatus } from "./razorpay";

// Create payment orders table
export const createPaymentOrdersTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS payment_orders (
      id VARCHAR(255) PRIMARY KEY,
      amount DECIMAL(10, 2) NOT NULL,
      currency VARCHAR(3) DEFAULT 'INR',
      status ENUM('created', 'completed', 'failed', 'pending') DEFAULT 'created',
      membership_type VARCHAR(100),
      payment_id VARCHAR(255),
      signature VARCHAR(255),
      user_details JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completed_at TIMESTAMP NULL
    )
  `;

  await executeQuery(query);
  console.log("Payment orders table created/verified");
};

// Create memberships table
export const createMembershipsTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS memberships (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      order_id VARCHAR(255) NOT NULL,
      payment_id VARCHAR(255) NOT NULL,
      membership_type INT,
      status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NULL,
      FOREIGN KEY (order_id) REFERENCES payment_orders(id)
    )
  `;

  await executeQuery(query);
  console.log("Memberships table created/verified");
};

// Insert payment order
export const insertPaymentOrder = async (
  order: Partial<PaymentOrder>
): Promise<void> => {
  const query = `
    INSERT INTO payment_orders (id, amount, currency, status, membership_type, created_at) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await executeQuery(query, [
    order.id,
    order.amount,
    order.currency || "INR",
    order.status || PaymentStatus.CREATED,
    order.membership_type,
    order.created_at || new Date(),
  ]);
};

// Update payment order
export const updatePaymentOrder = async (
  orderId: string,
  updates: Partial<PaymentOrder>
): Promise<void> => {
  const query = `
    UPDATE payment_orders SET 
    payment_id = ?, signature = ?, status = ?, 
    user_details = ?, completed_at = ?
    WHERE id = ?
  `;

  await executeQuery(query, [
    updates.payment_id,
    updates.signature,
    updates.status,
    updates.user_details ? JSON.stringify(updates.user_details) : null,
    updates.completed_at || new Date(),
    orderId,
  ]);
};

// Insert membership
export const insertMembership = async (
  membership: Partial<Membership>
): Promise<void> => {
  const query = `
    INSERT INTO memberships (user_id, order_id, payment_id, membership_type, status, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Calculate expiry date (1 year from now)
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  await executeQuery(query, [
    membership.user_id,
    membership.order_id,
    membership.payment_id,
    membership.membership_type,
    membership.status || "active",
    expiresAt,
  ]);
};

// Get payment order by ID
export const getPaymentOrder = async (
  orderId: string
): Promise<PaymentOrder | null> => {
  const query = `SELECT * FROM payment_orders WHERE id = ?`;
  const result = await executeQuery<PaymentOrder[]>(query, [orderId]);
  return result.length > 0 ? result[0] : null;
};

// Get membership by user_id
export const getMembershipByUserId = async (
  userId: number
): Promise<Membership | null> => {
  const query = `SELECT * FROM memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`;
  const result = await executeQuery<Membership[]>(query, [userId]);
  return result.length > 0 ? result[0] : null;
};

// Initialize payment database tables
export const initializePaymentDatabase = async (): Promise<void> => {
  try {
    await createPaymentOrdersTable();
    await createMembershipsTable();
    console.log("Payment database tables initialized successfully");
  } catch (error) {
    console.error("Failed to initialize payment database:", error);
    throw error;
  }
};
