import React from 'react';
import { Dumbbell, BarChart3, Brain, Home, User } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  theme: 'light' | 'dark';
}

export function Navbar({ currentView, onViewChange, theme }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Workout Generator', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ml-predictor', label: 'ML Predictor', icon: Brain },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className={`border-b backdrop-blur-xl ${
      theme === 'dark' 
        ? 'border-gray-700 bg-gray-900/50' 
        : 'border-gray-200 bg-white/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                NFL Elite Trainer
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                AI-Powered Performance Analytics
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
