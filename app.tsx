import React, { useState } from 'react';
import { Position, Goal, Workout, PlayerStats } from './types';
import { generateWorkout } from './utils/workoutGenerator';
import { useTheme } from './hooks/useTheme';
import { useWorkoutHistory } from './hooks/useWorkoutHistory';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { PositionSelector } from './components/PositionSelector';
import { GoalSelector } from './components/GoalSelector';
import { WorkoutDisplay } from './components/WorkoutDisplay';
import { WorkoutHistory } from './components/WorkoutHistory';
import { Dashboard } from './components/Dashboard';
import { MLPredictor } from './components/MLPredictor';
import { ArrowLeft, Zap } from 'lucide-react';

type Step = 'position' | 'goal' | 'workout';
type View = 'home' | 'dashboard' | 'ml-predictor' | 'profile';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { history, addToHistory, clearHistory } = useWorkoutHistory();
  
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentStep, setCurrentStep] = useState<Step>('position');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock player stats for dashboard
  const mockPlayerStats: PlayerStats = {
    id: '1',
    name: 'Elite Athlete',
    position: 'Quarterback',
    workoutsCompleted: 47,
    averageEfficiency: 87,
    totalTrainingHours: 156,
    strengthGains: 23,
    speedImprovement: 12,
    injuryRate: 2.1,
    lastWorkout: new Date(),
    weeklyProgress: [
      { week: 'Week 1', efficiency: 78, workouts: 4, duration: 45 },
      { week: 'Week 2', efficiency: 82, workouts: 5, duration: 52 },
      { week: 'Week 3', efficiency: 85, workouts: 4, duration: 48 },
      { week: 'Week 4', efficiency: 87, workouts: 6, duration: 58 },
      { week: 'Week 5', efficiency: 89, workouts: 5, duration: 55 },
      { week: 'Week 6', efficiency: 91, workouts: 4, duration: 50 }
    ]
  };

  const handlePositionSelect = (position: Position) => {
    setSelectedPosition(position);
    setCurrentStep('goal');
  };

  const handleGoalSelect = async (goal: Goal) => {
    setSelectedGoal(goal);
    setCurrentStep('workout');
    await generateNewWorkout(selectedPosition!, goal);
  };

  const generateNewWorkout = async (position: Position, goal: Goal) => {
    setIsGenerating(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const workout = generateWorkout(position.id, goal.id, position.name, goal.name);
    setCurrentWorkout(workout);
    
    // Add to history
    addToHistory({
      position: position.name,
      goal: goal.name,
      workout
    });
    
    setIsGenerating(false);
  };

  const handleRegenerate = () => {
    if (selectedPosition && selectedGoal) {
      generateNewWorkout(selectedPosition, selectedGoal);
    }
  };

  const handleReset = () => {
    setCurrentStep('position');
    setSelectedPosition(null);
    setSelectedGoal(null);
    setCurrentWorkout(null);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    if (view === 'home') {
      // Reset workout generator state when returning to home
      setCurrentStep('position');
    }
  };

  const backgroundClass = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
    : 'bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50';

  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      {/* Background overlay for dark mode */}
      {theme === 'dark' && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-gray-900/20 pointer-events-none" />
      )}
      
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar 
          currentView={currentView} 
          onViewChange={handleViewChange} 
          theme={theme} 
        />

        {/* Header with Theme Toggle */}
        <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                {currentView === 'home' && currentStep !== 'position' && (
                  <button
                    onClick={handleReset}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                        : 'bg-white/50 text-gray-700 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Start Over</span>
                  </button>
                )}
              </div>
              
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'home' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Hero Section */}
                {currentStep === 'position' && (
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 mb-6">
                      <Zap className="h-8 w-8 text-purple-600" />
                      <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Elite Performance Training
                      </h2>
                    </div>
                    <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Get personalized, position-specific workouts designed by NFL-level strength and conditioning experts. 
                      Build the strength, speed, and skills to dominate on the field.
                    </p>
                  </div>
                )}

                {/* Step Content */}
                <div className={`rounded-2xl border-2 p-8 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-800/30'
                    : 'border-white/50 bg-white/50'
                }`}>
                  {currentStep === 'position' && (
                    <PositionSelector
                      selectedPosition={selectedPosition}
                      onSelect={handlePositionSelect}
                      theme={theme}
                    />
                  )}
                  
                  {currentStep === 'goal' && (
                    <GoalSelector
                      selectedGoal={selectedGoal}
                      onSelect={handleGoalSelect}
                      theme={theme}
                    />
                  )}
                  
                  {currentStep === 'workout' && (
                    <WorkoutDisplay
                      workout={currentWorkout!}
                      onRegenerate={handleRegenerate}
                      theme={theme}
                      isGenerating={isGenerating}
                    />
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className={`rounded-2xl border-2 p-6 backdrop-blur-sm sticky top-24 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-800/30'
                    : 'border-white/50 bg-white/50'
                }`}>
                  <WorkoutHistory
                    history={history}
                    onClear={clearHistory}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          )}

          {currentView === 'dashboard' && (
            <Dashboard playerStats={mockPlayerStats} theme={theme} />
          )}

          {currentView === 'ml-predictor' && (
            <MLPredictor theme={theme} />
          )}

          {currentView === 'profile' && (
            <div className={`rounded-2xl border-2 p-8 text-center ${
              theme === 'dark'
                ? 'border-gray-600 bg-gray-800/30'
                : 'border-white/50 bg-white/50'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Profile Management
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Profile features coming soon! Track your personal records, set goals, and manage your training preferences.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className={`border-t mt-16 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 NFL Elite Trainer. Professional-grade conditioning programs with AI-powered analytics.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
