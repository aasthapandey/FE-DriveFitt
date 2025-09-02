#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying Razorpay Payment Integration...\n");

// Define required files and directories
const requiredFiles = [
  // Environment configuration
  ".env.local",

  // Backend files
  "src/lib/razorpay.ts",
  "src/lib/paymentService.ts",
  "src/lib/paymentDatabase.ts",

  // API routes
  "src/app/api/payments/create-order/route.ts",
  "src/app/api/payments/verify/route.ts",
  "src/app/api/payments/webhook/route.ts",
  "src/app/api/payments/init-db/route.ts",

  // Frontend components
  "src/components/common/RazorpayScript.tsx",
  "src/components/common/PaymentModal.tsx",
  "src/components/common/PaymentButton.tsx",
  "src/components/common/EnhancedPaymentModal.tsx",
  "src/components/common/PaymentSuccess.tsx",
  "src/components/common/PaymentError.tsx",

  // Types and utilities
  "src/types/payment.ts",
  "src/utils/paymentUtils.ts",

  // Documentation
  "RAZORPAY_INTEGRATION.md",
];

// Define required directories
const requiredDirs = [
  "src/app/api/payments",
  "src/components/common",
  "src/types",
  "src/utils",
];

// Check if files exist
console.log("📁 Checking required files...");
let allFilesExist = true;

requiredFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check if directories exist
console.log("\n📂 Checking required directories...");
let allDirsExist = true;

requiredDirs.forEach((dir) => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    console.log(`✅ ${dir}`);
  } else {
    console.log(`❌ ${dir} - MISSING`);
    allDirsExist = false;
  }
});

// Check package.json for razorpay dependency
console.log("\n📦 Checking dependencies...");
const packageJsonPath = path.join(process.cwd(), "package.json");
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  if (packageJson.dependencies && packageJson.dependencies.razorpay) {
    console.log("✅ razorpay dependency found");
  } else {
    console.log("❌ razorpay dependency missing");
    allFilesExist = false;
  }
} else {
  console.log("❌ package.json not found");
  allFilesExist = false;
}

// Check layout.tsx for RazorpayScript
console.log("\n🔧 Checking layout integration...");
const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, "utf8");
  if (layoutContent.includes("RazorpayScript")) {
    console.log("✅ RazorpayScript found in layout.tsx");
  } else {
    console.log("❌ RazorpayScript not found in layout.tsx");
    allFilesExist = false;
  }
} else {
  console.log("❌ layout.tsx not found");
  allFilesExist = false;
}

// Summary
console.log("\n📊 Integration Summary:");
console.log(`Files: ${allFilesExist ? "✅ All present" : "❌ Some missing"}`);
console.log(
  `Directories: ${allDirsExist ? "✅ All present" : "❌ Some missing"}`
);

if (allFilesExist && allDirsExist) {
  console.log("\n🎉 Razorpay Payment Integration is COMPLETE!");
  console.log("\n📋 Next Steps:");
  console.log("1. Update .env.local with your Razorpay keys");
  console.log("2. Initialize database tables: POST /api/payments/init-db");
  console.log("3. Test the integration with test payments");
  console.log("4. Configure webhooks in Razorpay dashboard");
  console.log("5. Deploy to production with live keys");
} else {
  console.log(
    "\n⚠️  Some components are missing. Please check the errors above."
  );
}

console.log("\n📚 For detailed documentation, see: RAZORPAY_INTEGRATION.md");


