import { motion } from 'motion/react';
import {
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Activity,
  RefreshCw,
  Download,
  Share2,
  Brain,
  Zap,
  Target,
  Network,
  ChevronRight
} from 'lucide-react';

interface ResultsScreenProps {
  onReset: () => void;
}

const mainMetrics = [
  { label: 'Eficiencia Global', value: 94.8, icon: Activity, color: '#1976D2' },
  { label: 'Precisión ANN', value: 97.2, icon: Target, color: '#7B1FA2' },
  { label: 'Fitness GA', value: 92.5, icon: Zap, color: '#F57C00' },
  { label: 'Estabilidad', value: 89.4, icon: TrendingUp, color: '#2E7D32' },
];

export default function ResultsScreen({ onReset }: ResultsScreenProps) {
  return (
    <div className="size-full flex flex-col bg-[#0F172A] p-6 overflow-y-auto overflow-x-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-[#1976D2] to-[#1565C0] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CheckCircle2 className="size-7 text-white" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              Análisis Completado
            </h1>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
              ID Proceso: #OPT-2024-X92
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={onReset}
          className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-md"
        >
          <RefreshCw className="size-5 text-white/60" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 flex-1">
        
        {/* Left Column - Main Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {mainMetrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white/5">
                    <metric.icon className="size-5" style={{ color: metric.color }} />
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Live</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {metric.value}%
                </div>
                <div className="text-white/40 text-xs font-medium">
                  {metric.label}
                </div>
                <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Detailed Cards */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* GA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Zap className="size-32 text-orange-500" />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <Zap className="size-6 text-orange-500" />
              <h3 className="text-xl font-bold text-white">Optimización Metaheurística (GA Propio)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResultDetail 
                label="Generaciones" 
                value="150" 
                sub="Ciclos Evolutivos"
                progress={100}
                color="#F57C00"
              />
              <ResultDetail 
                label="Población" 
                value="200" 
                sub="Individuos"
                progress={80}
                color="#F57C00"
              />
              <ResultDetail 
                label="Mejor Fitness" 
                value="0.925" 
                sub="Score de Convergencia"
                progress={92}
                color="#F57C00"
              />
            </div>
          </motion.div>

          {/* ANN Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Brain className="size-32 text-purple-500" />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Brain className="size-6 text-purple-500" />
              <h3 className="text-xl font-bold text-white">Predicción Avanzada (ANN)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResultDetail 
                label="MSE" 
                value="0.0012" 
                sub="Error Cuadrático Medio"
                progress={98}
                color="#7B1FA2"
              />
              <ResultDetail 
                label="Neuronas" 
                value="64x128" 
                sub="Arquitectura de Capas"
                progress={100}
                color="#7B1FA2"
              />
              <ResultDetail 
                label="R² Score" 
                value="0.978" 
                sub="Coeficiente Predictivo"
                progress={97}
                color="#7B1FA2"
              />
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 pt-4"
          >
            <button className="flex-1 py-4 px-6 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <Download className="size-5" />
              Descargar Informe Técnico
            </button>
            <button className="flex-1 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Share2 className="size-5" />
              Compartir Resultados
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Final touch: subtle floating lines or dots could be added here if needed */}
    </div>
  );
}

function ResultDetail({ label, value, sub, progress, color }: { label: string, value: string, sub: string, progress: number, color: string }) {
  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-[10px] text-white/40 mb-3">{sub}</div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
