// Simple test script to check database configuration
require('dotenv').config();

console.log('🔍 Testing Database Configuration...\n');

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'quiz_builder',
  nodeEnv: process.env.NODE_ENV || 'development'
};

console.log('📊 Database Configuration:');
console.log(`  Host: ${config.host}`);
console.log(`  Port: ${config.port}`);
console.log(`  Username: ${config.username}`);
console.log(`  Database: ${config.database}`);
console.log(`  Environment: ${config.nodeEnv}`);
console.log(`  Password: ${config.password ? '***set***' : '***NOT SET***'}`);

console.log('\n✅ Configuration loaded successfully!');
console.log('💡 Make sure to set your actual database password in .env file');
