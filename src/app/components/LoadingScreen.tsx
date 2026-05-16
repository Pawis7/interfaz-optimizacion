import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Brain, 
  Cpu, 
  Network, 
  Layers, 
  Zap,
  BarChart,
  Target
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'FASE I',
    subtitle: 'AGRUPAMIENTO DE DATOS (K-MEANS)',
    description: 'Segmentando datasets complejos en clusters semánticos...',
    icon: Database,
    duration: 3500,
    color: '#1976D2'
  },
  {
    id: 2,
    title: 'FASE II',
    subtitle: 'OPTIMIZACIÓN METAHEURÍSTICA (GA PROPIO)',
    description: 'Evolucionando soluciones óptimas mediante Algoritmos Genéticos...',
    icon: Zap,
    duration: 4000,
    color: '#F57C00'
  },
  {
    id: 3,
    title: 'FASE III',
    subtitle: 'PREDICCIÓN AVANZADA (ANN)',
    description: 'Entrenando Redes Neuronales Artificiales para análisis predictivo...',
    icon: Brain,
    duration: 4500,
    color: '#7B1FA2'
  },
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setProgress(0);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (steps[currentStep].duration / 40);
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [currentStep]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="size-full flex flex-col items-center justify-center bg-[#0F172A] p-6 overflow-hidden relative">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 size-full bg-[#1976D2] rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 size-full bg-[#7B1FA2] rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Visual Animation Container */}
        <div className="h-64 w-full flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateY: -90 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative"
            >
              <div className="size-40 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <CurrentIcon className="size-20 text-white" />
                </motion.div>
                
                {/* Orbital particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 3 + i, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div 
                      className="size-2 rounded-full absolute"
                      style={{ 
                        backgroundColor: steps[currentStep].color,
                        top: '0%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${1 - i*0.1})`,
                        boxShadow: `0 0 15px ${steps[currentStep].color}`
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Info */}
        <div className="text-center mb-10 h-32">
          <motion.div
            key={`title-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] tracking-[0.2em] font-bold border border-white/5 uppercase">
              {steps[currentStep].title}
            </span>
          </motion.div>
          
          <motion.h2
            key={`subtitle-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white mb-3 tracking-tight"
          >
            {steps[currentStep].subtitle}
          </motion.h2>
          
          <motion.p
            key={`desc-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-sm max-w-md mx-auto leading-relaxed"
          >
            {steps[currentStep].description}
          </motion.p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md space-y-6">
          <div className="relative">
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: steps[currentStep].color }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            {/* Glow effect for progress bar */}
            <motion.div 
              className="absolute inset-0 blur-md opacity-30 h-full pointer-events-none"
              style={{ 
                width: `${progress}%`,
                backgroundColor: steps[currentStep].color 
              }}
            />
          </div>

          <div className="flex justify-between items-center px-2">
            <div className="flex gap-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentStep
                      ? 'w-12'
                      : index < currentStep
                      ? 'w-4 opacity-100'
                      : 'w-4 opacity-20'
                  }`}
                  style={{ 
                    backgroundColor: index <= currentStep ? steps[index].color : 'white'
                  }}
                />
              ))}
            </div>
            <span className="text-white/40 font-mono text-xs tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 flex items-center gap-3 text-white/30"
        >
          <div className="flex gap-1">
            <div className="size-1 bg-white/30 rounded-full" />
            <div className="size-1 bg-white/30 rounded-full" />
            <div className="size-1 bg-white/30 rounded-full" />
          </div>
          <span className="text-[10px] tracking-[0.3em] font-medium uppercase">
            Sistema Metaheurístico Activo
          </span>
        </motion.div>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
}
