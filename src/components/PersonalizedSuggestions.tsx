import React, { useState, useEffect } from 'react';
import { MapPin, Star, Compass, Loader2, Heart, TrendingUp } from 'lucide-react';

interface Suggestion {
  id: string;
  destination: string;
  country: string;
  description: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  category: string;
  reason: string;
}

const PersonalizedSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPersonalizedSuggestions();
  }, []);

  const fetchPersonalizedSuggestions = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSuggestions: Suggestion[] = [
        {
          id: '1',
          destination: 'OOTY',
          country: 'Tamil Nadu',
          description: 'Escape to Ooty — a picturesque hill station with misty mountains, tea gardens, boat rides, and breathtaking views all year round!',
          rating: 4.8,
          priceRange: '$20-200/night',
          imageUrl: 'https://e0.pxfuel.com/wallpapers/343/593/desktop-wallpaper-ooty-hill-station.jpg',
          category: 'Hill Station',
          reason: 'Based on your love for Hill destinations'
        },
        {
          id: '2',
          destination: 'Meenakshi Amman Temple',
          country: 'Madurai',
          description: 'Meenakshi Amman Temple in Madurai is a magnificent Dravidian marvel, famed for its towering gopurams, vibrant sculptures, and sacred rituals.',
          rating: 4.9,
          priceRange: '$15-30/night',
          imageUrl: 'https://sanatanajourney.com/wp-content/uploads/2025/03/Madurai-Meenakshi-Amman-Temple-Features.jpg',
          category: 'Culture',
          reason: 'Spiritual, architectural, cultural, historic, vibrant'
        },
        {
          id: '3',
          destination: 'Theni & Thekkady (Border)',
          country: 'Theni',
          description: 'Adventure lovers can enjoy river rafting on the Periyar River, wildlife trekking in Periyar Tiger Reserve, and scenic hikes through spice plantations and waterfalls.',
          rating: 4.7,
          priceRange: '$25-50/night',
          imageUrl: 'https://xiradestinations.com/wp-content/uploads/2020/04/1414.jpg',
          category: 'Adventure',
          reason: 'Thrilling, scenic, serene, wild, refreshing.'
        },
        {
          id: '4',
          destination: 'Kuttralam',
          country: 'Thenkasi',
          description: 'Immerse yourself in vibrant markets, stunning architecture, and rich culture.',
          rating: 4.6,
          priceRange: '$10-25/night',
          imageUrl: 'https://img3.oastatic.com/img2/64600669/max/variant.jpg',
          category: 'Nature',
          reason: 'Healing, adventurous, scenic, cultural, refreshing.'
        },
        {
          id: '5',
          destination: 'Velankanni',
          country: 'Nagappattinam',
          description: 'The Basilica of Our Lady of Good Health draws millions annually, blending spirituality, colonial architecture, and peaceful beachfront charm.',
          rating: 4.5,
          priceRange: '$18-35/night',
          imageUrl: 'https://tripxl.com/blog/wp-content/uploads/2024/11/Basilica-Of-Our-Lady-Of-Good-Health.jpg',
          category: 'Culture',
          reason: 'Spiritual, healing, peaceful, sacred, iconic.'
        },
        {
          id: '6',
          destination: 'Dhanushkodi',
          country: 'Rameshwaram',
          description: 'Rameswaram is a sacred island pilgrimage famed for the majestic Ramanathaswamy Temple, sprawling corridors, spiritual baths, historic bridge, and pristine beaches. ',
          rating: 4.4,
          priceRange: '$120-280/night',
          imageUrl: 'https://rameswaramtourism.org/info/FR_Arichalmunai.webp',
          category: 'Beach',
          reason: 'Spiritual, historic, scenic, rejuvenating, iconic.'
        }
      ];
      
      setSuggestions(mockSuggestions);
    } catch (err) {
      setError('Failed to load personalized suggestions');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Beach':
        return <Heart className="w-4 h-4" />;
      case 'Culture':
        return <Star className="w-4 h-4" />;
      case 'Adventure':
        return <Compass className="w-4 h-4" />;
      case 'Nature':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Finding perfect destinations for you...</span>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Personalized Suggestions</h2>
        <span className="text-sm text-gray-500">Based on your travel preferences</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="relative">
              <img 
                src={suggestion.imageUrl} 
                alt={suggestion.destination}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                {getCategoryIcon(suggestion.category)}
                <span className="text-xs font-medium text-gray-700">{suggestion.category}</span>
              </div>
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-gray-700">{suggestion.rating}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{suggestion.destination}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {suggestion.country}
                </p>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-blue-600">{suggestion.priceRange}</span>
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 font-medium">{suggestion.reason}</p>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Explore Destination
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedSuggestions;