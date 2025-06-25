import React from 'react';
import { PlayerStats } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Target, Zap, Award, Calendar } from 'lucide-react';

interface DashboardProps {
  playerStats: PlayerStats;
  theme: 'light' | 'dark';
}

export function Dashboard({ playerStats, theme }: DashboardProps) {
  const chartColors = {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const pieData = [
    { name: 'Strength', value: 35, color: chartColors.primary },
    { name: 'Speed', value: 25, color: chartColors.secondary },
    { name: 'Agility', value: 20, color: chartColors.accent },
    { name: 'Endurance', value: 20, color: chartColors.success }
  ];

  const performanceMetrics = [
    {
      label: 'Workouts Completed',
      value: playerStats.workoutsCompleted,
      icon: Target,
      color: 'text-purple-600',
      bgColor: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-100'
    },
    {
      label: 'Average Efficiency',
      value: `${playerStats.averageEfficiency}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'
    },
    {
      label: 'Training Hours',
      value: `${playerStats.totalTrainingHours}h`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'
    },
    {
      label: 'Speed Improvement',
      value: `+${playerStats.speedImprovement}%`,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`rounded-2xl border-2 p-6 ${
        theme === 'dark'
          ? 'border-gray-600 bg-gray-800/30'
          : 'border-white/50 bg-white/50'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Performance Dashboard
            </h2>
            <p className={`text-lg mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {playerStats.name} • {playerStats.position}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-8 w-8 text-yellow-500" />
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Elite Athlete
            </span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className={`rounded-xl border-2 p-6 transition-all duration-200 hover:scale-105 ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-800/30'
                  : 'border-white/50 bg-white/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {metric.label}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {metric.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <div className={`rounded-2xl border-2 p-6 ${
          theme === 'dark'
            ? 'border-gray-600 bg-gray-800/30'
            : 'border-white/50 bg-white/50'
        }`}>
          <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Weekly Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={playerStats.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="week" 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke={chartColors.primary} 
                strokeWidth={3}
                dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartColors.primary, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Training Distribution */}
        <div className={`rounded-2xl border-2 p-6 ${
          theme === 'dark'
            ? 'border-gray-600 bg-gray-800/30'
            : 'border-white/50 bg-white/50'
        }`}>
          <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Training Focus Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workout Volume Chart */}
      <div className={`rounded-2xl border-2 p-6 ${
        theme === 'dark'
          ? 'border-gray-600 bg-gray-800/30'
          : 'border-white/50 bg-white/50'
      }`}>
        <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Weekly Workout Volume
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={playerStats.weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="week" 
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: theme === 'dark' ? '#ffffff' : '#000000'
              }}
            />
            <Bar 
              dataKey="workouts" 
              fill={chartColors.secondary}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="duration" 
              fill={chartColors.accent}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl border-2 p-6 ${
        theme === 'dark'
          ? 'border-gray-600 bg-gray-800/30'
          : 'border-white/50 bg-white/50'
      }`}>
        <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'Completed Speed Training', time: '2 hours ago', score: 92 },
            { action: 'Strength Workout Session', time: '1 day ago', score: 88 },
            { action: 'Agility Training', time: '2 days ago', score: 85 },
            { action: 'Endurance Session', time: '3 days ago', score: 90 }
          ].map((activity, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-700/30'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Calendar className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {activity.action}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                activity.score >= 90
                  ? 'bg-green-100 text-green-800'
                  : activity.score >= 85
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.score}% Efficiency
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
