import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';

export type AppState = 'home' | 'loading' | 'results';
export type Profile = 'basico' | 'intermedio' | 'avanzado' | 'experto';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleOptimize = () => {
    setAppState('loading');
    setTimeout(() => {
      setAppState('results');
    }, 8000);
  };

  const handleReset = () => {
    setAppState('home');
    setSelectedProfile(null);
  };

  return (
    <div className="size-full bg-background">
      {appState === 'home' && (
        <HomeScreen
          selectedProfile={selectedProfile}
          onSelectProfile={setSelectedProfile}
          onOptimize={handleOptimize}
        />
      )}
      {appState === 'loading' && <LoadingScreen />}
      {appState === 'results' && (
        <ResultsScreen profile={selectedProfile!} onReset={handleReset} />
      )}
    </div>
  );
}
