import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, CreditCard, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface BookingHistory {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  guests: number;
  price: number;
  imageUrl: string;
  status: 'completed' | 'canceled';
  bookingDate: string;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBookings: BookingHistory[] = [
        {
          id: '1',
          destination: 'Thiruvalluvar Statue, Kannyakumari',
          startDate: '2024-06-15',
          endDate: '2024-06-22',
          guests: 7,
          price: 80,
          imageUrl: 'https://www.starlinetravels.com/wp-content/uploads/2021/06/Resized-thiruvalluvar-statue.jpg',
          status: 'completed',
          bookingDate: '2024-03-10'
        },
        {
          id: '2',
          destination: 'Periya Kovil, Tanjore',
          startDate: '2024-08-20',
          endDate: '2024-08-25',
          guests: 10,
          price: 100,
          imageUrl: 'https://www.delhitourism.com/images/destination/5e5f83dac53d61.jpg',
          status: 'completed',
          bookingDate: '2024-05-15'
        },
        {
          id: '3',
          destination: 'Koomapatty, Virudunagar',
          startDate: '2024-09-10',
          endDate: '2024-09-17',
          guests: 8,
          price: 100,
          imageUrl: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcplAN4FQvJTxNZ1L3DzRi3FoKaZpaAeUO2lIBsPXpgRwic_CxWdtDuvIB-MZSybtlwk4vwNiCtUoirWF2wBS0-1-Knm3vqlf7NLCy0cPRYDyKMVWQFd1hUrgvHb-e1nKEqon-LFw?key=kBehL50iaasCDXsR-lVl3Q',
          status: 'canceled',
          bookingDate: '2024-07-05'
        },
        {
          id: '4',
          destination: 'Velankanni Beach, Naagai',
          startDate: '2024-10-01',
          endDate: '2024-10-08',
          guests: 5,
          price: 200,
          imageUrl: 'https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/09/Velankanni.jpg',
          status: 'completed',
          bookingDate: '2024-08-12'
        }
      ];
      
      setBookings(mockBookings);
    } catch (err) {
      setError('Failed to load booking history');
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
        <span className="ml-2 text-gray-600">Loading your booking history...</span>
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

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No booking history</h3>
        <p className="text-gray-600">Your past bookings will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
        <span className="text-sm text-gray-500">{bookings.length} booking{bookings.length > 1 ? 's' : ''}</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <img 
                  src={booking.imageUrl} 
                  alt={booking.destination}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{booking.destination}</h3>
                    <div className="flex items-center space-x-2">
                      {booking.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        booking.status === 'completed' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {booking.status === 'completed' ? 'Completed' : 'Canceled'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span className="font-semibold">${booking.price}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Booked on {formatDate(booking.bookingDate)}
                  </div>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;