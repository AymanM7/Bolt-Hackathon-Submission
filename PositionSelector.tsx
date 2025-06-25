import React from 'react';
import { Position } from '../types';
import { positions } from '../data/positions';

interface PositionSelectorProps {
  selectedPosition: Position | null;
  onSelect: (position: Position) => void;
  theme: 'light' | 'dark';
}

export function PositionSelector({ selectedPosition, onSelect, theme }: PositionSelectorProps) {
  const groupedPositions = positions.reduce((acc, position) => {
    if (!acc[position.category]) {
      acc[position.category] = [];
    }
    acc[position.category].push(position);
    return acc;
  }, {} as Record<string, Position[]>);

  const categoryLabels = {
    offense: 'Offense',
    defense: 'Defense',
    special: 'Special Teams'
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Select Your Position
      </h2>
      
      {Object.entries(groupedPositions).map(([category, categoryPositions]) => (
        <div key={category} className="space-y-3">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoryPositions.map((position) => (
              <button
                key={position.id}
                onClick={() => onSelect(position)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 group ${
                  selectedPosition?.id === position.id
                    ? theme === 'dark'
                      ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25'
                      : 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/25'
                    : theme === 'dark'
                      ? 'border-gray-600 bg-gray-800/50 hover:border-purple-400 hover:bg-purple-500/10'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{position.icon}</span>
                  <span className={`font-medium ${
                    selectedPosition?.id === position.id
                      ? theme === 'dark' ? 'text-white' : 'text-purple-900'
                      : theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {position.name}
                  </span>
                </div>
                {selectedPosition?.id === position.id && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 border-2 border-white shadow-lg" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
