import React from 'react';
import { Activity, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">HealthTrack</span>
            </div>
            <p className="mt-4 text-sm">
              Revolutionizing healthcare through secure, AI-powered health record management.
            </p>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-center sm:justify-start">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-sm">contact@healthtrack.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-sm">+91 123 456 7890</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">Chhattisgarh, India</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Follow Us</h3>
            <div className="mt-4 flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} HealthTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}