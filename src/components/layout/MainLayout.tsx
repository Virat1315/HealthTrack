import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from '../chat/ChatWidget';
import HowItWorks from '../common/HowItWorks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ChatWidget />
      <HowItWorks />
      <ToastContainer position="top-right" />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 