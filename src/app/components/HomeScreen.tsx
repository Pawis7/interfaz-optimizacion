import { FileCheck, Zap, Play, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { Profile } from '../App';

interface HomeScreenProps {
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
  onOptimize: () => void;
}

const profiles: { id: Profile; label: string; desc: string }[] = [
  { id: 'basico', label: 'Básico', desc: 'Optimización rápida y ligera' },
  { id: 'intermedio', label: 'Intermedio', desc: 'Equilibrio entre velocidad y precisión' },
  { id: 'avanzado', label: 'Avanzado', desc: 'Análisis profundo y exhaustivo' },
  { id: 'experto', label: 'Experto', desc: 'Máxima precisión computacional' },
];

export default function HomeScreen({ 
  selectedProfile, 
  onSelectProfile, 
  onOptimize 
}: HomeScreenProps) {
  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-[#1976D2] to-[#1565C0] p-6 overflow-y-auto">
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
        className="bg-white rounded-3xl shadow-xl p-6 flex flex-col"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="size-14 rounded-2xl bg-[#E3F2FD] flex items-center justify-center">
            <FileCheck className="size-8 text-[#1976D2]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Configuración</h2>
            <p className="text-sm text-gray-500">Selecciona el perfil de ejecución</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProfile(p.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                selectedProfile === p.id
                  ? 'border-[#1976D2] bg-[#E3F2FD]'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="text-left">
                <div className={`font-semibold ${selectedProfile === p.id ? 'text-[#1976D2]' : 'text-gray-900'}`}>
                  {p.label}
                </div>
                <div className="text-xs text-gray-500">{p.desc}</div>
              </div>
              <ChevronRight className={`size-5 transition-transform ${
                selectedProfile === p.id ? 'text-[#1976D2] translate-x-1' : 'text-gray-300'
              }`} />
            </button>
          ))}
        </div>

        <motion.button
          onClick={onOptimize}
          disabled={!selectedProfile}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          className={`py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3 transition-all duration-200 ${
            selectedProfile 
              ? 'bg-[#1976D2] text-white hover:bg-[#1565C0] active:shadow-xl cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Play className="size-6" />
          Iniciar Optimización
        </motion.button>
      </motion.div>
    </div>
  );
}
