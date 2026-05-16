import { FileCheck, Zap, Play, Database, Network, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onOptimize: () => void;
}

export default function HomeScreen({ onOptimize }: HomeScreenProps) {
  return (
    <div className="size-full flex flex-col bg-[#020617] p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] size-[60%] bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] size-[60%] bg-purple-600/20 blur-[120px] rounded-full" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-12 mt-4 relative z-10"
      >
        <div className="size-14 rounded-2xl bg-gradient-to-br from-[#1976D2] to-[#1565C0] flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap className="size-7 text-white" />
        </div>
        <div>
          <h1 className="text-white text-3xl font-extrabold tracking-tight">Optimizador IA</h1>
          <p className="text-white/40 text-xs font-mono uppercase tracking-[0.3em]">Advanced Metaheuristic System</p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="size-32 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-8 relative"
          >
            <FileCheck className="size-16 text-blue-400" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-blue-400/30 rounded-3xl scale-125"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Dataset Cargado
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-lg mb-12 max-w-sm leading-relaxed"
          >
            Estructura de datos verificada. El sistema está listo para la optimización metaheurística.
          </motion.p>

          <div className="grid grid-cols-3 gap-6 mb-12 w-full">
             <FeatureIcon icon={Database} label="Data Source" />
             <FeatureIcon icon={Cpu} label="Meta-GA" />
             <FeatureIcon icon={Network} label="ANN Model" />
          </div>

          <motion.button
            onClick={onOptimize}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-6 rounded-3xl bg-blue-600 text-white font-bold text-xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-4 transition-all"
          >
            <Play className="size-8 fill-current" />
            Iniciar Optimización
          </motion.button>
        </motion.div>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}

function FeatureIcon({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="size-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
        <Icon className="size-6 text-white/40" />
      </div>
      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{label}</span>
    </div>
  );
}
