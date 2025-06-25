import React from 'react';
import { WorkoutHistory as WorkoutHistoryType } from '../types';
import { Clock, User, Target, TrendingUp, Trash2 } from 'lucide-react';

interface WorkoutHistoryProps {
  history: WorkoutHistoryType[];
  onClear: () => void;
  theme: 'light' | 'dark';
}

export function WorkoutHistory({ history, onClear, theme }: WorkoutHistoryProps) {
  if (history.length === 0) {
    return (
      <div className={`rounded-xl border-2 p-8 text-center ${
        theme === 'dark'
          ? 'border-gray-600 bg-gray-800/50'
          : 'border-gray-200 bg-white'
      }`}>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          No workout history yet. Generate your first workout to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Recent Workouts
        </h3>
        <button
          onClick={onClear}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="space-y-3">
        {history.map((entry) => (
          <div
            key={entry.id}
            className={`rounded-lg border p-4 transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <User className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {entry.position}
                </span>
                <Target className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {entry.goal}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={`h-4 w-4 ${
                  entry.workout.efficiency.score >= 80
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                }`} />
                <span className={`font-bold ${
                  entry.workout.efficiency.score >= 80
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  {entry.workout.efficiency.score}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className={`h-3 w-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                {new Date(entry.createdAt).toLocaleDateString()} at {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
