import React, { useState } from 'react';
import { 
  Link2, 
  BarChart3,
  History, 
  CreditCard, 
  Copy, 
  Trophy,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
  Share,
  Coins,
  BarChart
} from 'lucide-react';

import WhatsAppIcon from './components/icons/WhatsAppIcon.jsx';
import XIcon from './components/icons/XIcon.jsx';
import LinkedInIcon from './components/icons/LinkedInIcon.jsx';
import BarChartNoAxis from './components/icons/BarChartNoAxis.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('referral');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('');

  const referralLink = 'https://asandevnest.com/register?ref=JOHNDOE123';
  
  const leaderboardData = [
    { id: 1, name: 'Sarah Johnson', avatar: 'SJ', coins: 2500, referrals: 10, rank: 1 },
    { id: 2, name: 'Mike Chen', avatar: 'MC', coins: 2100, referrals: 8, rank: 2 },
    { id: 3, name: 'Me', avatar: 'ME', coins: 1250, referrals: 5, rank: 3 },
    { id: 4, name: 'Emma Davis', avatar: 'ED', coins: 1000, referrals: 4, rank: 4 },
    { id: 5, name: 'Alex Kumar', avatar: 'AK', coins: 750, referrals: 3, rank: 5 },
  ];

  const historyData = [
    { id: 1, name: 'Sarah Johnson', avatar: 'SJ', date: '2024-01-15', status: 'successful', amount: 250 },
    { id: 2, name: 'Mike Chen', avatar: 'MC', date: '2024-01-14', status: 'successful', amount: 250 },
    { id: 3, name: 'Me', avatar: 'ME', date: '2024-01-13', status: 'successful', amount: 250 },
    { id: 4, name: 'Emma Davis', avatar: 'ED', date: '2024-01-12', status: 'pending', amount: 0 },
    { id: 5, name: 'Alex Kumar', avatar: 'AK', date: '2024-01-11', status: 'successful', amount: 250 },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, label }) => (
    <div className="relative bg-white rounded-xl pt-8 p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col items-center">
      {/* Floating Icon above card */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
        <div className="w-10 h-10 bg-blue-50 rounded-lg shadow-md flex items-center justify-center">
          <Icon className="w-7 h-7 text-blue-600" />
        </div>
      </div>
      <div className="flex flex-col items-center text-center mb-4 mt-2">
        <p className="text-xs text-gray-500 font-medium mt-2">{label}</p>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );

  const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-base transition-all duration-200
        ${isActive
          ? 'bg-white text-blue-600 font-bold shadow-sm z-10'
          : 'text-black font-medium bg-transparent'}
      `}
      style={isActive ? { boxShadow: '0 2px 8px 0 rgba(24, 60, 255, 0.04)' } : {}}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-black'}`} />
      <span>{label}</span>
    </button>
  );

  const Avatar = ({ name, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base'
    };
    
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold`}>
        {name}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Referral Dashboard</h1>
            </div>
            <p className="text-blue-100">Earn ₹250 for every successful referral</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Coins}
              title="Total Coins"
              value="1,250"
              label="Total Coins"
            />
            <StatCard
              icon={CheckCircle}
              title="Successful referrals"
              value="05"
              label="Successful Referrals"
            />
            <StatCard
              icon={Clock}
              title="Pending referrals"
              value="03"
              label="Pending Referrals"
            />
            <StatCard
              icon={BarChartNoAxis}
              title="Weekly Rank"
              value="#3"
              label="Weekly Rank"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center gap-2 mb-6 bg-[#f4f6ff] rounded-2xl p-2">
          <TabButton
            id="referral"
            icon={Link2}
            label="Referral Link"
            isActive={activeTab === 'referral'}
            onClick={() => setActiveTab('referral')}
          />
          <TabButton
            id="leaderboard"
            icon={BarChart3}
            label="Leaderboard"
            isActive={activeTab === 'leaderboard'}
            onClick={() => setActiveTab('leaderboard')}
          />
          <TabButton
            id="history"
            icon={History}
            label="History"
            isActive={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
          <TabButton
            id="withdraw"
            icon={Coins}
            label="Withdraw"
            isActive={activeTab === 'withdraw'}
            onClick={() => setActiveTab('withdraw')}
          />
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Referral Link Tab */}
          {activeTab === 'referral' && (
            <>
              {/* Referral Link Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900">Your Referral Link</h2>
                </div>
                <p className="text-gray-600 mb-4">Share this link with your friends to earn ₹250 when they buy a project</p>
                
                <div className="flex gap-2 mb-4">
                <div className="flex-1 p-3 bg-blue-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-800 font-mono break-all">{referralLink}</p>
                </div>
                  <button
                    onClick={() => copyToClipboard(referralLink)}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 justify-end">
                  <Share className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Share on</span>
                  <button className="p-1 text-gray-600 hover:text-green-600 transition-colors duration-200">
                    <img src="/src/assets/icons/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <img src="/src/assets/icons/x.svg" alt="X" className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <img src="/src/assets/icons/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* How Referrals Work */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Referrals Work?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1 - Share Link */}
                  <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Share className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-600 mb-3">Share Link</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Share your unique referral link with friends and colleagues</p>
                  </div>
                  
                  {/* Step 2 - Friend Buys Project */}
                  <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-600 mb-3">Friend Buys Project</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Your friend registers and purchases a project from our platform</p>
                  </div>
                  
                  {/* Step 3 - Earn ₹250 */}
                  <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-600 mb-3">Earn ₹250</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Get 250 coins (₹250) credited to your account instantly</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Weekly Leaderboard</h2>
              </div>
              <p className="text-gray-600 mb-6">Top referrers this week - compete for special rewards!</p>
              
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div key={user.id} className={`flex items-center justify-between p-4 rounded-lg hover:bg-blue-100 transition-colors duration-200 bg-blue-50`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'text-yellow-700' :
                        index === 1 ? 'text-orange-700' :
                        index === 2 ? 'text-orange-700' :
                        'text-blue-600'
                      }`}>
                        {index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index + 1}th`}
                      </div>
                      <Avatar name={user.avatar} />
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.referrals} successful referrals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{user.coins}</p>
                      <p className="text-xs text-gray-500">{user.coins} coins</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Referral History</h2>
              </div>
              <p className="text-gray-600 mb-6">Track all of your referrals and their status</p>
              
              <div className="space-y-4">
                {historyData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:border-blue-300 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Avatar name={item.avatar} />
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Referred on {new Date(item.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'successful' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status === 'successful' ? '✓ Successful' : '⏳ Pending'}
                      </span>
                      <span className={item.status === 'successful' ? 'text-green-600 font-bold' : 'text-gray-500 font-semibold'}>
                        +₹{item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Withdraw Tab */}
          {activeTab === 'withdraw' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Withdraw Form */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Withdraw Coins</h2>
          </div>
                <p className="text-gray-600 mb-6">Convert your coins to real money via UPI</p>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-black">Available Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">₹1250</p>
                  <p className="text-sm text-black">1250 coins available</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter your UPI ID"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount (₹)</label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                    Request Withdrawal
                  </button>
                </div>
              </div>

              {/* Withdrawal Guidelines */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Withdrawal Guidelines</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Minimum Requirement</p>
                      <p className="text-sm text-gray-600">At least 1 successful referral required</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Processing Time</p>
                      <p className="text-sm text-gray-600">24-48 hours for review and approval</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Valid UPI Required</p>
                      <p className="text-sm text-gray-600">Ensure your UPI ID is active and correct</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Manual Verification</p>
                      <p className="text-sm text-gray-600">All withdrawals are manually verified by our team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
