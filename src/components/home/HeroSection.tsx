import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationPopup from './NotificationPopup';

export default function HeroSection() {
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute inset-0 bg-[url('https://i.pinimg.com/originals/0c/79/d8/0c79d81a526cfe5572c342693efe6442.gif')]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            <span className="block mb-2">Revolutionize Your</span>
            <span className="block text-blue-600">Healthcare Experience</span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0">
            Secure, Accessible, and AI-Powered Health Records at your fingertips.
            Take control of your health journey with HealthTrack.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Sign Up with Aadhaar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/learn-more"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <NotificationPopup 
        isOpen={isNotificationPopupOpen} 
        onClose={() => setIsNotificationPopupOpen(false)} 
      />
    </div>
  );
}