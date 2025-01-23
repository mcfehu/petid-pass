import React from 'react';
import { PawPrint, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-[#FFD700]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <PawPrint className="h-8 w-8 text-[#008080]" />
            <span className="ml-2 text-xl font-bold text-[#008080]">PetID Pass</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#008080]">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#008080]">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-[#008080]">FAQ</a>
            <a href="#contact" className="text-gray-600 hover:text-[#008080]">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-[#008080] text-white px-4 py-2 rounded-lg hover:bg-[#006666] transition-colors">
              Get Early Access
            </button>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}