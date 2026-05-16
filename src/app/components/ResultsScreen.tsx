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
  Layers,
  Database
} from 'lucide-react';

interface ResultsScreenProps {
  onReset: () => void;
}

const clusterData = [
  {
    id: 1,
    name: 'Perfil 1 (Rojo)',
    records: 452,
    mseTradicional: 0.008451,
    mseOptimizado: 0.001243,
    neuronasOpt: 24,
    color: '#EF4444'
  },
  {
    id: 2,
    name: 'Perfil 2 (Verde)',
    records: 385,
    mseTradicional: 0.007922,
    mseOptimizado: 0.000985,
    neuronasOpt: 32,
    color: '#22C55E'
  },
  {
    id: 3,
    name: 'Perfil 3 (Azul)',
    records: 412,
    mseTradicional: 0.009134,
    mseOptimizado: 0.001156,
    neuronasOpt: 28,
    color: '#3B82F6'
  }
];

export default function ResultsScreen({ onReset }: ResultsScreenProps) {
  return (
    <div className="size-full flex flex-col bg-[#020617] p-6 overflow-y-auto overflow-x-hidden relative">
      {/* Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-1/4 -right-1/4 w-full h-full bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
            <CheckCircle2 className="size-7 text-white" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">Segmentación de Perfiles de Consumo</h1>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]">
              Features: Peak_Load_Hour, Normalized_Consumption
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={onReset}
          className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <RefreshCw className="size-5 text-white/60" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Top Summary Cards */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
          <SummaryCard icon={Database} label="Clusters (K)" value="3" color="#3B82F6" />
          <SummaryCard icon={Zap} label="Gen. Algoritmo" value="4" color="#F59E0B" />
          <SummaryCard icon={Activity} label="Población GA" value="8" color="#10B981" />
          <SummaryCard icon={Brain} label="Arquitectura" value="ANN (fitnet)" color="#A855F7" />
        </div>

        {/* Comparison Chart / Analysis */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Análisis Comparativo (MSE)</h3>
                <p className="text-white/40 text-sm">Error Cuadrático Medio: Tradicional vs Optimizado con GA</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-white/20" />
                  <span className="text-[10px] text-white/60 uppercase font-bold">Tradicional</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-white/60 uppercase font-bold">Optimizado</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {clusterData.map((cluster) => (
                <div key={cluster.id} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-white/80">{cluster.name}</span>
                    <div className="text-right">
                      <span className="text-[10px] text-blue-400 font-bold block">REDUCCIÓN: {Math.round((1 - cluster.mseOptimizado/cluster.mseTradicional) * 100)}%</span>
                    </div>
                  </div>
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden relative flex flex-col justify-center">
                    {/* Tradicional bar */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '90%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute h-full bg-white/10 left-0"
                    />
                    {/* Optimizado bar */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(cluster.mseOptimizado / cluster.mseTradicional) * 90}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="absolute h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] left-0"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-white/30">
                    <span>MSE: {cluster.mseTradicional.toFixed(6)}</span>
                    <span className="text-blue-400">MSE: {cluster.mseOptimizado.toFixed(6)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Genetic Algorithm Convergence Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="size-5 text-orange-500" />
              <h3 className="text-lg font-bold text-white">Log de Evolución Genética</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(gen => (
                 <div key={gen} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                   <div className="text-[10px] text-white/40 font-bold mb-1 uppercase">Gen {gen}</div>
                   <div className="text-white font-mono text-xs">MSE: {(0.005 / gen).toFixed(6)}</div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Per Profile Details */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest px-2">Detalle por Perfil</h3>
          {clusterData.map((cluster, idx) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full" style={{ backgroundColor: cluster.color }} />
                  <span className="font-bold text-white">{cluster.name}</span>
                </div>
                <span className="text-[10px] font-mono text-white/30">{cluster.records} registros</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-blue-400" />
                    <span className="text-xs text-white/60">Neuronas Opt.</span>
                  </div>
                  <span className="text-sm font-bold text-white">{cluster.neuronasOpt}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-purple-400" />
                    <span className="text-xs text-white/60">R² Score (ANN)</span>
                  </div>
                  <span className="text-sm font-bold text-white">0.984</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-4 space-y-3">
            <button className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <Download className="size-5" />
              Exportar reporte iiot.csv
            </button>
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Share2 className="size-5" />
              Generar Gráfica Comparativa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white/5">
          <Icon className="size-4" style={{ color }} />
        </div>
        <div>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{label}</div>
          <div className="text-white font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}
