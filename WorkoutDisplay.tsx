import React from 'react';
import { Workout } from '../types';
import { Clock, Repeat, Target, TrendingUp, RefreshCw } from 'lucide-react';

interface WorkoutDisplayProps {
  workout: Workout;
  onRegenerate: () => void;
  theme: 'light' | 'dark';
  isGenerating?: boolean;
}

export function WorkoutDisplay({ workout, onRegenerate, theme, isGenerating = false }: WorkoutDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return theme === 'dark' ? 'text-green-400' : 'text-green-600';
    if (score >= 80) return theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
    if (score >= 70) return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
    return theme === 'dark' ? 'text-orange-400' : 'text-orange-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-indigo-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  if (isGenerating) {
    return (
      <div className={`rounded-2xl border-2 p-8 text-center ${
        theme === 'dark'
          ? 'border-gray-600 bg-gray-800/50'
          : 'border-gray-200 bg-white'
      }`}>
        <div className="animate-spin h-8 w-8 border-3 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Generating your personalized workout...
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 overflow-hidden shadow-xl ${
      theme === 'dark'
        ? 'border-gray-600 bg-gray-800/50 shadow-black/25'
        : 'border-gray-200 bg-white shadow-gray-900/10'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              🏈 NFL Workout Plan for a {workout.position} – Goal: {workout.goal}
            </h2>
          </div>
          <button
            onClick={onRegenerate}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            title="Generate new workout"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Exercises */}
      <div className="p-6">
        <div className="space-y-4 mb-8">
          {workout.exercises.map((exercise, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-200 hover:scale-105 ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-700/30 hover:bg-gray-700/50'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exercise.name}
                </h4>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Repeat className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {exercise.sets} sets
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {exercise.reps}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {exercise.rest}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Efficiency Score */}
        <div className={`rounded-xl border-2 p-6 ${
          theme === 'dark'
            ? 'border-gray-600 bg-gray-700/30'
            : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              📊 Efficiency Score
            </h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className={`h-5 w-5 ${getScoreColor(workout.efficiency.score)}`} />
              <span className={`text-3xl font-bold ${getScoreColor(workout.efficiency.score)}`}>
                {workout.efficiency.score}
              </span>
              <span className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                /100
              </span>
            </div>
          </div>
          
          {/* Score Bar */}
          <div className={`w-full h-3 rounded-full mb-4 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(workout.efficiency.score)} transition-all duration-1000 ease-out`}
              style={{ width: `${workout.efficiency.score}%` }}
            />
          </div>
          
          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {workout.efficiency.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
