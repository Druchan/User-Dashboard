import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Calendar, MapPin, Clock, Star, Plane, Users, CreditCard } from 'lucide-react';
import UpcomingTrips from './UpcomingTrips';
import BookingHistory from './BookingHistory';
import PersonalizedSuggestions from './PersonalizedSuggestions';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Trips', icon: Calendar },
    { id: 'history', label: 'Booking History', icon: Clock },
    { id: 'suggestions', label: 'Suggestions', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Plane className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">TravelHub</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Welcome, {user?.name}!</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-200">
          {activeTab === 'upcoming' && <UpcomingTrips />}
          {activeTab === 'history' && <BookingHistory />}
          {activeTab === 'suggestions' && <PersonalizedSuggestions />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;