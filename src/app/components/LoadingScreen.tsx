import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Brain, Network } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'PASO 1',
    subtitle: 'CARGA Y AGRUPAMIENTO DE DATOS (K-MEANS)',
    icon: Database,
    duration: 3000,
  },
  {
    id: 2,
    title: 'PASO 2',
    subtitle: 'OPTIMIZACIÓN METAHEURÍSTICA (GA PROPIO) Y PREDICCIÓN (ANN)',
    icon: Brain,
    duration: 5000,
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
        const increment = 100 / (steps[currentStep].duration / 50);
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1976D2] to-[#1565C0] p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="size-24 rounded-full bg-white/20 flex items-center justify-center mb-8"
          >
            <CurrentIcon className="size-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-white/80 text-sm mb-2">
              {steps[currentStep].title}
            </div>
            <div className="text-white font-semibold text-lg max-w-md px-4">
              {steps[currentStep].subtitle}
            </div>
          </motion.div>

          <div className="w-full max-w-md">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`size-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-white w-8'
                      : index < currentStep
                      ? 'bg-white/60'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-8 flex items-center gap-2"
          >
            <Network className="size-5 text-white/60" />
            <span className="text-white/60 text-sm">Procesando...</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
