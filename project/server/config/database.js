// Mock database implementation for WebContainer environment
let isConnected = false;

const connectDB = async () => {
  try {
    // Simulate database connection
    console.log('Using mock database for WebContainer environment');
    console.log('Mock Database Connected: localhost (simulated)');
    isConnected = true;
    return { connection: { host: 'localhost (mock)' } };
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
export { isConnected };