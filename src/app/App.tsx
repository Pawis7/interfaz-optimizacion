import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';

export type AppState = 'home' | 'loading' | 'results';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');

  const handleOptimize = () => {
    setAppState('loading');
    setTimeout(() => {
      setAppState('results');
    }, 12500);
  };

  const handleReset = () => {
    setAppState('home');
  };

  return (
    <div className="size-full bg-background overflow-hidden">
      {appState === 'home' && (
        <HomeScreen
          onOptimize={handleOptimize}
        />
      )}
      {appState === 'loading' && <LoadingScreen />}
      {appState === 'results' && (
        <ResultsScreen onReset={handleReset} />
      )}
    </div>
  );
}
