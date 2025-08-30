/**
 * Test script for Razorpay API implementation
 * Run with: node scripts/test-razorpay-api.js
 */

const BASE_URL = "http://localhost:3000";

async function testCreateOrder() {
  console.log("\n🧪 Testing Create Order API...");

  try {
    const response = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1, // ₹1 for testing
        currency: "INR",
        membership_type: "Premium",
        receipt: `test_receipt_${Date.now()}`,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Create Order Success:", {
        orderId: data.orderId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
      });
      return data.orderId;
    } else {
      console.error("❌ Create Order Failed:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Create Order Error:", error.message);
    return null;
  }
}

async function testGetOrderDetails(orderId) {
  if (!orderId) {
    console.log("⏭️ Skipping order details test (no order ID)");
    return;
  }

  console.log("\n🧪 Testing Get Order Details API...");

  try {
    const response = await fetch(
      `${BASE_URL}/api/payments/details?orderId=${orderId}`
    );
    const data = await response.json();

    if (response.ok) {
      console.log("✅ Get Order Details Success:", {
        orderId: data.data.order?.id,
        status: data.data.order?.status,
        amount: data.data.order?.amount,
      });
    } else {
      console.error("❌ Get Order Details Failed:", data);
    }
  } catch (error) {
    console.error("❌ Get Order Details Error:", error.message);
  }
}

async function testPaymentVerification(orderId, paymentId, signature) {
  if (!orderId || !paymentId || !signature) {
    console.log("⏭️ Skipping payment verification test (missing parameters)");
    return;
  }

  console.log("\n🧪 Testing Payment Verification API...");

  try {
    const response = await fetch(`${BASE_URL}/api/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        paymentId,
        signature,
        userDetails: {
          name: "Test User",
          email: "test@example.com",
          contact: "9876543210",
          membership_type: "Premium",
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Payment Verification Success:", {
        success: data.success,
        paymentId: data.paymentId,
        orderId: data.orderId,
        paymentStatus: data.paymentStatus,
      });
    } else {
      console.error("❌ Payment Verification Failed:", data);
    }
  } catch (error) {
    console.error("❌ Payment Verification Error:", error.message);
  }
}

async function testRefund(paymentId) {
  if (!paymentId) {
    console.log("⏭️ Skipping refund test (no payment ID)");
    return;
  }

  console.log("\n🧪 Testing Refund API...");

  try {
    const response = await fetch(`${BASE_URL}/api/payments/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
        amount: 0.5, // ₹0.50 partial refund
        reason: "Test refund",
        notes: {
          test: "true",
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Refund Success:", {
        success: data.success,
        refundId: data.refundId,
      });
    } else {
      console.error("❌ Refund Failed:", data);
    }
  } catch (error) {
    console.error("❌ Refund Error:", error.message);
  }
}

async function runTests() {
  console.log("🚀 Starting Razorpay API Tests...\n");

  // Test 1: Create Order
  const orderId = await testCreateOrder();

  // Test 2: Get Order Details
  await testGetOrderDetails(orderId);

  // Test 3: Payment Verification (with dummy data)
  // Note: In real scenario, these would come from Razorpay checkout
  const dummyPaymentId = "pay_test123456789";
  const dummySignature = "dummy_signature_for_testing";
  await testPaymentVerification(orderId, dummyPaymentId, dummySignature);

  // Test 4: Refund (with dummy payment ID)
  await testRefund(dummyPaymentId);

  console.log("\n✨ Tests completed!");
  console.log(
    "\n📝 Note: Payment verification and refund tests use dummy data."
  );
  console.log("   For real testing, complete a payment through the UI first.");
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testCreateOrder,
  testGetOrderDetails,
  testPaymentVerification,
  testRefund,
  runTests,
};
