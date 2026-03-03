import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

console.log('🔍 Checking seller account setup...');

// Check if SELLER_EMAIL and SELLER_PASSWORD are set in environment variables
if (!process.env.SELLER_EMAIL || !process.env.SELLER_PASSWORD) {
  console.error('❌ Error: SELLER_EMAIL and SELLER_PASSWORD are not set in your .env file');
  console.log('\n📋 Please add these to your .env file:');
  console.log('SELLER_EMAIL=admin@example.com');
  console.log('SELLER_PASSWORD=your_secure_password');
  console.log('');
  
  // Try to read the .env file to see if it exists
  const envFilePath = './.env';
  if (fs.existsSync(envFilePath)) {
    console.log('📄 Current .env file contents:');
    const envContent = fs.readFileSync(envFilePath, 'utf8');
    console.log(envContent);
  } else {
    console.log('📄 No .env file found in the current directory.');
  }
  
  process.exit(1);
}

console.log('✅ Seller account environment variables are properly configured!');
console.log(`📧 Seller Email: ${process.env.SELLER_EMAIL}`);
console.log(`🔒 Seller Password: [configured in environment variables]`);
console.log('');
console.log('🎉 The seller account is ready to use!');
console.log('You can now log in to the seller panel at /seller/login using these credentials.');
console.log('');
console.log('ℹ️  Note: This system uses environment variables for seller authentication,');
console.log('   no database record is needed. The login validates against the environment values.');

process.exit(0);
