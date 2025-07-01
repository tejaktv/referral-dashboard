# Referral Dashboard - MERN Stack

A complete referral system built with MongoDB, Express.js, React, and Node.js.

## Features

- **User Authentication**: Register/Login with JWT tokens
- **Referral System**: Generate unique referral codes and track referrals
- **Coin System**: Earn coins for successful referrals
- **Leaderboard**: Weekly rankings based on referral performance
- **Withdrawal System**: Request withdrawals via UPI
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls
- Vite for development

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd referral-dashboard-mern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/referral-dashboard
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Referrals
- `GET /api/referrals/stats` - Get referral statistics
- `GET /api/referrals/history` - Get referral history
- `GET /api/referrals/leaderboard` - Get leaderboard
- `POST /api/referrals/process` - Process a referral

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/referral/:code` - Get user by referral code

### Withdrawals
- `POST /api/withdrawals/request` - Request withdrawal
- `GET /api/withdrawals/history` - Get withdrawal history
- `GET /api/withdrawals/:id` - Get specific withdrawal

## Database Schema

### User Model
- Personal information (name, email, password)
- Referral code and statistics
- Coin balance and referral counts
- Authentication and profile data

### Referral Model
- Referrer and referred user relationship
- Status tracking (pending, successful, failed)
- Coins earned and purchase information

### Withdrawal Model
- Withdrawal requests with UPI details
- Status tracking and admin processing
- Transaction history

## Development

### Project Structure
```
├── server/                 # Backend code
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── config/            # Configuration files
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── services/          # API services
│   ├── hooks/             # Custom hooks
│   └── utils/             # Utility functions
└── public/                # Static assets
```

### Key Features Implementation

1. **Authentication Flow**
   - JWT-based authentication
   - Protected routes with middleware
   - Automatic token refresh

2. **Referral System**
   - Unique referral code generation
   - Automatic referral tracking
   - Coin rewards for successful referrals

3. **Real-time Updates**
   - Live statistics updates
   - Dynamic leaderboard
   - Instant withdrawal status

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to Netlify, Vercel, or serve from Express

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.