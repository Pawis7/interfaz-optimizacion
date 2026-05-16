import { FileCheck, Zap, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  selectedProfile: any;
  onSelectProfile: any;
  onOptimize: () => void;
}

export default function HomeScreen({ onOptimize }: HomeScreenProps) {
  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-[#1976D2] to-[#1565C0] p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8 mt-4"
      >
        <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
          <Zap className="size-6 text-white" />
        </div>
        <div>
          <h1 className="text-white text-2xl font-semibold">Optimizador IA</h1>
          <p className="text-white/80 text-sm">Sistema de optimización inteligente</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="size-24 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-6"
        >
          <FileCheck className="size-12 text-[#1976D2]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-gray-900 mb-2"
        >
          CSV Cargado
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-600 mb-8 text-center"
        >
          Datos listos para optimización
        </motion.p>

        <motion.button
          onClick={onOptimize}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          className="py-4 px-8 rounded-2xl bg-[#1976D2] text-white font-semibold text-lg shadow-lg hover:bg-[#1565C0] active:shadow-xl transition-all duration-200 flex items-center gap-3"
        >
          <Play className="size-6" />
          Iniciar Prueba
        </motion.button>
      </motion.div>
    </div>
  );
}
