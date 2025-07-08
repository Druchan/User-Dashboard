import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, CreditCard, Loader2 } from 'lucide-react';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  guests: number;
  price: number;
  imageUrl: string;
  status: 'confirmed' | 'pending';
}

const UpcomingTrips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUpcomingTrips();
  }, []);

  const fetchUpcomingTrips = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrips: Trip[] = [
        {
          id: '1',
          destination: 'Alleppey, Kerala',
          startDate: '2024-12-15',
          endDate: '2024-12-22',
          guests: 2,
          price: 100,
          imageUrl: 'https://www.ekeralatourism.net/wp-content/uploads/2018/03/Alleppey.jpg',
          status: 'confirmed'
        },
        {
          id: '2',
          destination: 'Agra, Delhi',
          startDate: '2025-01-10',
          endDate: '2025-01-18',
          guests: 1,
          price: 200,
          imageUrl: 'https://www.tourmyindia.com/socialimg/taj-mahal-up.jpg',
          status: 'pending'
        },
        {
          id: '3',
          destination: 'Manali, Himachal Pradesh',
          startDate: '2025-02-14',
          endDate: '2025-02-21',
          guests: 4,
          price: 180,
          imageUrl: 'https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/06/Top-4-Indian-skiing-destinations-Solang.jpg',
          status: 'confirmed'
        }
      ];
      
      setTrips(mockTrips);
    } catch (err) {
      setError('Failed to load upcoming trips');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading your upcoming trips...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming trips</h3>
        <p className="text-gray-600">Start planning your next adventure!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Upcoming Trips</h2>
        <span className="text-sm text-gray-500">{trips.length} trip{trips.length > 1 ? 's' : ''}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="relative">
              <img 
                src={trip.imageUrl} 
                alt={trip.destination}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                trip.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {trip.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{trip.destination}</h3>
                <span className="text-lg font-bold text-blue-600">${trip.price}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{trip.guests} guest{trip.guests > 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;