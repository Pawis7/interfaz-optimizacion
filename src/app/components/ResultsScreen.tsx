import { motion } from 'motion/react';
import {
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Activity,
  RefreshCw,
  Download,
  Share2,
} from 'lucide-react';
import type { Profile } from '../App';

interface ResultsScreenProps {
  profile: Profile;
  onReset: () => void;
}

const profileMetrics: Record<
  Profile,
  { efficiency: number; accuracy: number; speed: number; clusters: number }
> = {
  basico: { efficiency: 75, accuracy: 82, speed: 68, clusters: 3 },
  intermedio: { efficiency: 85, accuracy: 88, speed: 80, clusters: 5 },
  avanzado: { efficiency: 92, accuracy: 94, speed: 87, clusters: 7 },
  experto: { efficiency: 97, accuracy: 98, speed: 95, clusters: 10 },
};

export default function ResultsScreen({ profile, onReset }: ResultsScreenProps) {
  const metrics = profileMetrics[profile];

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-[#1976D2] to-[#1565C0] p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 mt-4"
      >
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold">
              Optimización Completada
            </h1>
            <p className="text-white/80 text-sm">Perfil: {profile}</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="size-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <RefreshCw className="size-5 text-white" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl shadow-xl p-6 mb-4"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="size-5 text-[#1976D2]" />
          <h2 className="text-lg font-semibold text-gray-900">
            Métricas de Rendimiento
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            label="Eficiencia"
            value={metrics.efficiency}
            icon={Activity}
            delay={0.1}
          />
          <MetricCard
            label="Precisión"
            value={metrics.accuracy}
            icon={CheckCircle2}
            delay={0.2}
          />
          <MetricCard
            label="Velocidad"
            value={metrics.speed}
            icon={TrendingUp}
            delay={0.3}
          />
          <MetricCard
            label="Clusters"
            value={metrics.clusters}
            icon={BarChart3}
            delay={0.4}
            isCount
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-xl p-6 mb-4"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Resultados K-Means</h3>
        <div className="space-y-3">
          <ResultItem
            label="Grupos identificados"
            value={`${metrics.clusters} clusters`}
            color="bg-blue-500"
          />
          <ResultItem
            label="Convergencia"
            value="12 iteraciones"
            color="bg-green-500"
          />
          <ResultItem
            label="Silhouette Score"
            value="0.85"
            color="bg-purple-500"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-6 mb-4"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          Optimización Genética (GA)
        </h3>
        <div className="space-y-3">
          <ResultItem
            label="Generaciones"
            value="50 ciclos"
            color="bg-orange-500"
          />
          <ResultItem
            label="Fitness máximo"
            value={`${metrics.accuracy}%`}
            color="bg-red-500"
          />
          <ResultItem
            label="Población final"
            value="100 individuos"
            color="bg-yellow-500"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-3 mt-auto pt-4"
      >
        <button className="py-3 px-4 rounded-2xl bg-white text-[#1976D2] font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
          <Download className="size-5" />
          Exportar
        </button>
        <button className="py-3 px-4 rounded-2xl bg-white text-[#1976D2] font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
          <Share2 className="size-5" />
          Compartir
        </button>
      </motion.div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  delay: number;
  isCount?: boolean;
}

function MetricCard({ label, value, icon: Icon, delay, isCount }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-4 text-[#1976D2]" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[#1976D2]">
        {isCount ? value : `${value}%`}
      </div>
      {!isCount && (
        <div className="mt-2 h-1.5 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ delay: delay + 0.2, duration: 0.8 }}
            className="h-full bg-[#1976D2] rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
}

interface ResultItemProps {
  label: string;
  value: string;
  color: string;
}

function ResultItem({ label, value, color }: ResultItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
      <div className="flex items-center gap-3">
        <div className={`size-2 rounded-full ${color}`} />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
