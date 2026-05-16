import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  {
    id: 1,
    title: 'FASE I',
    subtitle: 'CARGA Y AGRUPAMIENTO DE DATOS (K-MEANS)',
    description: 'Segmentando perfiles de consumo eléctrico mediante Peak_Load_Hour y Normalized_Consumption...',
    duration: 4000,
    color: '#3B82F6',
  },
  {
    id: 2,
    title: 'FASE II',
    subtitle: 'OPTIMIZACIÓN METAHEURÍSTICA (GA PROPIO)',
    description: 'Ejecutando GA Manual para optimizar arquitectura de la ANN (Población: 8, Gen: 4)...',
    duration: 4500,
    color: '#F59E0B',
  },
  {
    id: 3,
    title: 'FASE III',
    subtitle: 'PREDICCIÓN AVANZADA (ANN)',
    description: 'Entrenamiento final de la ANN optimizada con fitnet y algoritmo trainlm...',
    duration: 4000,
    color: '#A855F7',
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
        const increment = 100 / (steps[currentStep].duration / 30);
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="size-full flex flex-col items-center justify-center bg-[#020617] p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(30,41,59,0.6)_0%,rgba(2,6,23,1)_80%)]" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Visual Area */}
        <div className="h-72 w-full flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            {currentStep === 0 && <KMeansAnimation key="kmeans" />}
            {currentStep === 1 && <GAAnimation key="ga" />}
            {currentStep === 2 && <ANNAnimation key="ann" />}
          </AnimatePresence>
        </div>

        {/* Phase Info */}
        <div className="text-center mb-10 min-h-[130px]">
          <motion.div
            key={`badge-${currentStep}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5"
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">
              {steps[currentStep].title}
            </span>
          </motion.div>

          <motion.h2
            key={`title-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl font-black text-white mb-3 tracking-tighter"
          >
            {steps[currentStep].subtitle}
          </motion.h2>

          <motion.p
            key={`desc-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed"
          >
            {steps[currentStep].description}
          </motion.p>
        </div>

        {/* Progress */}
        <div className="w-full max-w-md">
          <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ backgroundColor: steps[currentStep].color }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/20">
            <span>EXECUTING_ALGORITHM</span>
            <span className="text-white/50 tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex gap-3 mt-10">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: idx === currentStep ? 40 : 16,
                backgroundColor:
                  idx < currentStep
                    ? 'rgba(255,255,255,0.4)'
                    : idx === currentStep
                    ? 'white'
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Phase 1: K-Means ────────────────────────────────────────────────────────
// All random values are computed once via useMemo so they never change on re-render.
const CLUSTER_COLORS = ['#3B82F6', '#60A5FA', '#93C5FD'];
const CLUSTER_CENTERS = [
  { x: -55, y: -45 },
  { x: 60, y: 10 },
  { x: -10, y: 60 },
];

function KMeansAnimation() {
  // 24 points with stable positions and cluster assignments
  const points = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const cluster = i % 3;
        // Deterministic spread based on index
        const angle = (i / 8) * Math.PI * 2;
        const r = 70 + (i * 7) % 40;
        return {
          id: i,
          cluster,
          startX: Math.cos(angle) * r,
          startY: Math.sin(angle) * r,
          endX: CLUSTER_CENTERS[cluster].x + Math.cos(angle * 3) * 18,
          endY: CLUSTER_CENTERS[cluster].y + Math.sin(angle * 3) * 18,
          delay: (i % 6) * 0.15,
        };
      }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
      style={{ width: 260, height: 260 }}
    >
      {/* Cluster glow areas */}
      {CLUSTER_CENTERS.map((c, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `calc(50% + ${c.x}px)`,
            top: `calc(50% + ${c.y}px)`,
            transform: 'translate(-50%,-50%)',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: CLUSTER_COLORS[i],
            filter: 'blur(28px)',
          }}
        />
      ))}

      {/* Data points */}
      {points.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.startX, y: p.startY, opacity: 0.4, scale: 0.8 }}
          animate={{ x: p.endX, y: p.endY, opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -4,
            marginTop: -4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: CLUSTER_COLORS[p.cluster],
            boxShadow: `0 0 8px ${CLUSTER_COLORS[p.cluster]}`,
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── Phase 2: GA (Genetic Algorithm) ─────────────────────────────────────────
// Stable chromosome rows – no Math.random() inside render
const NUM_ROWS = 6;
const NUM_BITS = 10;

const CHROMOSOMES = Array.from({ length: NUM_ROWS }, (_, row) =>
  Array.from({ length: NUM_BITS }, (_, bit) => ({
    value: (row * 13 + bit * 7) % 2 === 0 ? 1 : 0,
    pulseDelay: (row * NUM_BITS + bit) * 0.06,
    mutates: (row * 3 + bit) % 5 === 0,
  }))
);

function GAAnimation() {
  const [generation, setGeneration] = useState(1);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  // Every 600ms mutate a random stable set of bits
  useEffect(() => {
    const interval = setInterval(() => {
      setGeneration((g) => g + 1);
      setFlipped(new Set(
        CHROMOSOMES.flatMap((row, r) =>
          row
            .filter((b) => b.mutates)
            .map((_, bi) => `${r}-${bi * 2}`)
        )
      ));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="text-[10px] font-mono text-amber-400/60 mb-1 tracking-widest">
        GENERATION #{String(generation).padStart(3, '0')}
      </div>
      {CHROMOSOMES.map((row, r) => (
        <div key={r} className="flex items-center gap-1.5">
          {row.map((bit, b) => {
            const key = `${r}-${b}`;
            const isMutated = flipped.has(key);
            return (
              <motion.div
                key={b}
                animate={{
                  backgroundColor: isMutated ? '#F59E0B' : bit.value ? '#1D4ED8' : '#1E293B',
                  scale: isMutated ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold border"
                style={{
                  color: isMutated ? '#fff' : bit.value ? '#93C5FD' : '#475569',
                  borderColor: isMutated ? '#F59E0B55' : bit.value ? '#1D4ED855' : '#1E293B',
                }}
              >
                {isMutated ? (bit.value === 1 ? 0 : 1) : bit.value}
              </motion.div>
            );
          })}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: r * 0.15 }}
            className="text-[9px] font-mono text-amber-400 ml-2"
          >
            {r % 2 === 0 ? 'CROSSOVER' : 'MUTATION'}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Phase 3: ANN (Neural Network) ───────────────────────────────────────────
const LAYERS = [
  { nodes: 4, x: 40 },
  { nodes: 6, x: 130 },
  { nodes: 5, x: 220 },
  { nodes: 3, x: 310 },
];
const SVG_W = 350;
const SVG_H = 240;

// Pre-compute node y positions
function nodeY(count: number, index: number) {
  const spacing = SVG_H / (count + 1);
  return spacing * (index + 1);
}

// Pre-compute edges between adjacent layers
const EDGES = LAYERS.slice(0, -1).flatMap((layer, li) =>
  Array.from({ length: layer.nodes }, (_, from) =>
    Array.from({ length: LAYERS[li + 1].nodes }, (_, to) => ({
      key: `${li}-${from}-${to}`,
      x1: layer.x,
      y1: nodeY(layer.nodes, from),
      x2: LAYERS[li + 1].x,
      y2: nodeY(LAYERS[li + 1].nodes, to),
      delay: ((li * layer.nodes + from + to) % 10) * 0.18,
    }))
  ).flat()
);

function ANNAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: SVG_W, height: SVG_H, position: 'relative' }}
    >
      <svg
        width={SVG_W}
        height={SVG_H}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Edges */}
        {EDGES.map((e) => (
          <line
            key={e.key}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#A855F722"
            strokeWidth={1}
          />
        ))}

        {/* Animated signal pulses */}
        {EDGES.filter((_, i) => i % 3 === 0).map((e) => (
          <motion.circle
            key={`pulse-${e.key}`}
            r={3}
            fill="#A855F7"
            filter="url(#glow)"
            initial={{ cx: e.x1, cy: e.y1, opacity: 0 }}
            animate={{
              cx: [e.x1, e.x2],
              cy: [e.y1, e.y2],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: e.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Nodes */}
      {LAYERS.map((layer, li) =>
        Array.from({ length: layer.nodes }, (_, ni) => (
          <motion.div
            key={`${li}-${ni}`}
            animate={{
              boxShadow: [
                '0 0 0px #A855F7',
                '0 0 14px #A855F7',
                '0 0 0px #A855F7',
              ],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: ((li * layer.nodes + ni) % 8) * 0.22,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: layer.x - 8,
              top: nodeY(layer.nodes, ni) - 8,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A855F7, #7C3AED)',
              border: '1.5px solid #A855F755',
            }}
          />
        ))
      )}
    </motion.div>
  );
}
