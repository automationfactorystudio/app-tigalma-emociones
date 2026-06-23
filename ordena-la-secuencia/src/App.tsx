/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  RotateCcw, 
  Trophy, 
  Star, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Sparkles,
  Award
} from "lucide-react";

// ============================================================================
// ESTRUCTURA DE LOS EJERCICIOS (FÁCILMENTE EDITABLE)
// ============================================================================
// Aquí puedes agregar, quitar o cambiar los ejercicios de forma muy sencilla.
// Cada elemento tiene un id, texto para mostrar, un emoji llamativo y colores pastel.
// ============================================================================

export interface SequenceItem {
  id: string;
  text: string;
  emoji: string;
  color: string; // Estilos de bordes y fondos de Tailwind para dar variedad visual
}

export interface Exercise {
  id: number;
  title: string;
  instruction: string;
  items: SequenceItem[];
  correctOrder: string[]; // Lista de IDs en el orden correcto
  hint: string;
}

const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "🌱 El ciclo de vida de una flor",
    instruction: "¿Cómo nace y crece una planta? Ordena las etapas desde la semilla enterrada hasta que se abre la flor.",
    hint: "Primero ponemos la semillita en la tierra 🫘, luego brota un poquito 🌱, crece con hojas 🌿 y finalmente florece hermosa 🌻.",
    items: [
      { id: "hojas", text: "Crece alta con ramitas y hojas verdes", emoji: "🌿", color: "border-teal-300 bg-teal-50 text-teal-800 focus:ring-teal-200" },
      { id: "semilla", text: "Sembrar la pequeña semilla en la tierra", emoji: "🫘", color: "border-amber-300 bg-amber-50 text-amber-800 focus:ring-amber-200" },
      { id: "flor", text: "¡Se abre una flor llena de colores y alegría!", emoji: "🌻", color: "border-yellow-300 bg-yellow-50 text-yellow-800 focus:ring-yellow-200" },
      { id: "brote", text: "Sale un pequeño brote verde hacia la luz", emoji: "🌱", color: "border-emerald-300 bg-emerald-50 text-emerald-800 focus:ring-emerald-200" },
    ],
    // El orden correcto en que deben quedar ordenados de arriba a abajo
    correctOrder: ["semilla", "brote", "hojas", "flor"]
  },
  {
    id: 2,
    title: "⏰ Mi rutina de la mañana",
    instruction: "¡Ha salido el sol! Ordena las acciones que realizas por la mañana antes de salir para el colegio.",
    hint: "Primero nos despertamos en la cama ⏰, después nos cepillamos muy bien los dientes 🪥, desayunamos algo rico 🥛 y nos ponemos la mochila 🎒.",
    items: [
      { id: "dientes", text: "Cepillarse bien los dientes para tener una sonrisa limpia", emoji: "🪥", color: "border-cyan-300 bg-cyan-50 text-cyan-800 focus:ring-cyan-200" },
      { id: "colegio", text: "Cerrar la mochila y salir felices camino a clase", emoji: "🎒", color: "border-indigo-300 bg-indigo-50 text-indigo-800 focus:ring-indigo-200" },
      { id: "despertar", text: "Escuchar el despertador y estirar los brazos", emoji: "⏰", color: "border-sky-300 bg-sky-50 text-sky-800 focus:ring-sky-200" },
      { id: "desayunar", text: "Tomar un desayuno saludable para tener mucha energía", emoji: "🥛", color: "border-orange-300 bg-orange-50 text-orange-800 focus:ring-orange-200" },
    ],
    correctOrder: ["despertar", "dientes", "desayunar", "colegio"]
  },
  {
    id: 3,
    title: "🎈 Globos de menor a mayor",
    instruction: "¡Juguemos con matemáticas! Ordena los globos con números desde el número más pequeñito hasta el más grande.",
    hint: "Busca el número menor (el más pequeño) para ponerlo arriba, y coloca el mayor (el más grande) abajo del todo.",
    items: [
      { id: "num15", text: "Globo con el número quince (15)", emoji: "🎈", color: "border-blue-300 bg-blue-50 text-blue-800 focus:ring-blue-200" },
      { id: "num3", text: "Globo con el número tres (3)", emoji: "🎈", color: "border-pink-300 bg-pink-50 text-pink-800 focus:ring-pink-200" },
      { id: "num24", text: "Globo con el número veinticuatro (24)", emoji: "🎈", color: "border-lime-300 bg-lime-50 text-lime-800 focus:ring-lime-200" },
      { id: "num8", text: "Globo con el número ocho (8)", emoji: "🎈", color: "border-purple-300 bg-purple-50 text-purple-800 focus:ring-purple-200" },
    ],
    correctOrder: ["num3", "num8", "num15", "num24"]
  },
  {
    id: 4,
    title: "🧼 Manos súper limpias",
    instruction: "¡Fuera virus y microbios! Ordena los pasos lógicos para lavarte las manos de manera correcta y sana.",
    hint: "Primero abrimos el grifo para mojar las manos 💦, frotamos bien con el jabón espumoso 🧼, aclaramos con agua 🚿 y las secamos con la toalla 🧴.",
    items: [
      { id: "secar", text: "Secar las gotitas con una toalla suave y limpia", emoji: "🧴", color: "border-amber-300 bg-amber-50 text-amber-800 focus:ring-amber-200" },
      { id: "mojar", text: "Abrir el agua y mojarse muy bien las palmas", emoji: "💦", color: "border-cyan-300 bg-cyan-50 text-cyan-800 focus:ring-cyan-200" },
      { id: "enjuagar", text: "Aclarar toda la espuma frotando bajo el chorro de agua", emoji: "🚿", color: "border-sky-300 bg-sky-50 text-sky-800 focus:ring-sky-200" },
      { id: "jabon", text: "Poner jabón y frotar hasta hacer un montón de burbujas", emoji: "🧼", color: "border-pink-300 bg-pink-50 text-pink-800 focus:ring-pink-200" },
    ],
    correctOrder: ["mojar", "jabon", "enjuagar", "secar"]
  },
  {
    id: 5,
    title: "🍓 Hacemos una merienda",
    instruction: "¡Tenemos hambre! Ordena los pasos necesarios para preparar un delicioso sándwich de mermelada.",
    hint: "Primero preparamos las dos rebanadas de pan 🍞, untamos la mermelada de fresa 🍓, las juntamos bien 🥪 y... ¡a comer! 😋",
    items: [
      { id: "comer", text: "Darle un gran mordisco y disfrutar del sabor", emoji: "😋", color: "border-yellow-300 bg-yellow-50 text-yellow-800 focus:ring-yellow-200" },
      { id: "pan", text: "Sacar dos rebanadas de pan blandito de la bolsa", emoji: "🍞", color: "border-amber-300 bg-amber-50 text-amber-800 focus:ring-amber-200" },
      { id: "juntar", text: "Colocar una rebanada sobre la otra para cerrarlo", emoji: "🥪", color: "border-orange-300 bg-orange-50 text-orange-800 focus:ring-orange-200" },
      { id: "mermelada", text: "Untar la mermelada roja con la ayuda de una cuchara", emoji: "🍓", color: "border-red-300 bg-red-50 text-red-800 focus:ring-red-200" },
    ],
    correctOrder: ["pan", "mermelada", "juntar", "comer"]
  },
  {
    id: 6,
    title: "☀️ El viaje del Sol",
    instruction: "¿Qué ocurre a lo largo de un día entero? Ordena estos momentos desde que sale el sol hasta que descansamos.",
    hint: "El día comienza al amanecer 🌅, luego el mediodía con el sol arriba ☀️, el atardecer con colores mágicos 🌇 y finalmente la noche estrellada 🌙.",
    items: [
      { id: "noche", text: "La noche: Aparecen la luna brillante y las estrellas para dormir", emoji: "🌙", color: "border-indigo-300 bg-indigo-50 text-indigo-800 focus:ring-indigo-200" },
      { id: "mediodia", text: "El mediodía: El sol brilla fuerte en lo más alto del cielo", emoji: "☀️", color: "border-yellow-300 bg-yellow-50 text-yellow-800 focus:ring-yellow-200" },
      { id: "amanecer", text: "El amanecer: El sol sale por la montaña y cantan los pajaritos", emoji: "🌅", color: "border-orange-300 bg-orange-50 text-orange-800 focus:ring-orange-200" },
      { id: "atardecer", text: "El atardecer: El sol se esconde dejando un cielo rosa y lila", emoji: "🌇", color: "border-pink-300 bg-pink-50 text-pink-800 focus:ring-pink-200" },
    ],
    correctOrder: ["amanecer", "mediodia", "atardecer", "noche"]
  }
];

export default function App() {
  const [screen, setScreen] = useState<"home" | "game" | "victory">("home");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [items, setItems] = useState<SequenceItem[]>([]);
  
  // Estados para retroalimentación
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState<Record<string, boolean>>({}); // id -> es correcto su index actual
  
  // Sistema de puntuación y estrellas ganadas
  const [stars, setStars] = useState<boolean[]>(new Array(EXERCISES.length).fill(false));
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem("ordena_secuencia_muted");
    return saved ? JSON.parse(saved) : false;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentExercise = EXERCISES[currentIdx];

  // Guardar silencio en local storage
  useEffect(() => {
    localStorage.setItem("ordena_secuencia_muted", JSON.stringify(isMuted));
  }, [isMuted]);

  // Inicializar ejercicio
  useEffect(() => {
    if (screen === "game" && currentExercise) {
      // Mezclar los elementos para que no empiecen en el orden correcto
      // Nos aseguramos que queden realmente desordenados (no coincida exactamente con correctOrder)
      let shuffled = [...currentExercise.items];
      let attempts = 0;
      
      const isArrayEqual = (arr1: string[], arr2: string[]) => 
        arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);

      do {
        shuffled = [...currentExercise.items].sort(() => Math.random() - 0.5);
        attempts++;
      } while (
        isArrayEqual(shuffled.map(item => item.id), currentExercise.correctOrder) && 
        attempts < 20
      );

      setItems(shuffled);
      setChecked(false);
      setIsCorrect(false);
      setCheckedStatus({});
      setShowHint(false);
    }
  }, [currentIdx, screen]);

  // Sintetizador de sonidos integrado (Web Audio API)
  const playSound = (type: "click" | "success" | "fail" | "complete" | "pop") => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "pop") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "success") {
        // Tono ascendente feliz (Do, Mi, Sol, Do)
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.25);
        });
      } else if (type === "complete") {
        // Gran fanfarria alegre al ganar todo el juego
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35);
          osc.start(ctx.currentTime + idx * 0.09);
          osc.stop(ctx.currentTime + idx * 0.09 + 0.35);
        });
      } else if (type === "fail") {
        // Tono descendente suave (boing boing)
        const notes = [160, 130];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.2);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.2);
        });
      }
    } catch (e) {
      console.warn("Audio Context blocked or not supported yet:", e);
    }
  };

  // Mover elemento arriba o abajo
  const handleMove = (index: number, direction: "up" | "down") => {
    playSound("pop");
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setItems(updated);

    // Reiniciar comprobación rápida para que no confunda al niño al cambiar de lugar
    if (checked) {
      setChecked(false);
    }
  };

  // Comprobar si el orden actual es el correcto
  const handleCheck = () => {
    const currentOrderIds = items.map(item => item.id);
    const correctOrder = currentExercise.correctOrder;
    
    // Validar cada elemento de manera individual para darle pistas visuales detalladas al niño
    const status: Record<string, boolean> = {};
    let correctCount = 0;

    currentOrderIds.forEach((id, idx) => {
      const isCorrectPlace = id === correctOrder[idx];
      status[id] = isCorrectPlace;
      if (isCorrectPlace) {
        correctCount++;
      }
    });

    setCheckedStatus(status);
    setChecked(true);

    if (correctCount === correctOrder.length) {
      setIsCorrect(true);
      playSound("success");
      triggerConfetti();

      // Guardar estrella ganada para este nivel
      const newStars = [...stars];
      newStars[currentIdx] = true;
      setStars(newStars);
    } else {
      setIsCorrect(false);
      playSound("fail");
    }
  };

  // Pasar al siguiente ejercicio o ir a la victoria final
  const handleNext = () => {
    playSound("click");
    if (currentIdx + 1 < EXERCISES.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setScreen("victory");
      playSound("complete");
    }
  };

  // Comenzar el juego desde el Home
  const handleStart = () => {
    playSound("success");
    setCurrentIdx(0);
    setStars(new Array(EXERCISES.length).fill(false));
    setScreen("game");
  };

  // Reiniciar ejercicio actual
  const handleRestartLevel = () => {
    playSound("click");
    // Volver a mezclar
    let shuffled = [...currentExercise.items];
    let attempts = 0;
    const isArrayEqual = (arr1: string[], arr2: string[]) => 
      arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);

    do {
      shuffled = [...currentExercise.items].sort(() => Math.random() - 0.5);
      attempts++;
    } while (
      isArrayEqual(shuffled.map(item => item.id), currentExercise.correctOrder) && 
      attempts < 20
    );

    setItems(shuffled);
    setChecked(false);
    setIsCorrect(false);
    setCheckedStatus({});
    setShowHint(false);
  };

  // Reiniciar todo el juego por completo
  const handleRestartFullGame = () => {
    playSound("click");
    setScreen("home");
    setCurrentIdx(0);
    setStars(new Array(EXERCISES.length).fill(false));
  };

  // ============================================================================
  // EFECTO DE CONFETI EN CANVAS (Para celebrar respuestas correctas)
  // ============================================================================
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    const colors = ["#FF7B9C", "#FFC75F", "#845EC2", "#D65DB1", "#4FFBDF", "#4D96FF", "#6BCB77"];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      angle: number;
      rotationSpeed: number;
    }> = [];

    // Generar partículas saliendo del centro inferior
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height - 20,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 12,
        speedY: -Math.random() * 14 - 8,
        angle: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.35; // Gravedad
        p.speedX *= 0.98; // Resistencia aire
        p.angle += p.rotationSpeed;

        if (p.y < canvas.height + 20) {
          alive = true;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (alive) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animate();
  };

  // Limpiar animaciones al desmontar
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-indigo-50 to-pink-100 flex flex-col justify-between font-sans antialiased text-gray-800 selection:bg-indigo-200">
      
      {/* HEADER / BARRA SUPERIOR */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b-2 border-indigo-100/50 py-3 px-4 sm:px-6 sticky top-0 z-40 shadow-sm transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={handleRestartFullGame}
            id="header-brand"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">🧩</span>
            <span className="font-display font-bold text-lg sm:text-xl text-indigo-700 tracking-tight">
              Ordena la Secuencia
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Indicador de Silencio */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSound("click");
              }}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title={isMuted ? "Activar sonido" : "Silenciar"}
              id="sound-toggle-btn"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Progreso del juego */}
            {screen === "game" && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 flex items-center gap-1">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mr-1">
                  Progreso:
                </span>
                <div className="flex gap-0.5">
                  {stars.map((earned, index) => (
                    <motion.div
                      key={index}
                      initial={false}
                      animate={earned ? { scale: [1, 1.3, 1] } : {}}
                      className="text-sm"
                    >
                      {earned ? "⭐" : "⚫"}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col justify-center items-center">
        
        <AnimatePresence mode="wait">
          
          {/* ==========================================
              PANTALLA DE INICIO (HOME)
              ========================================== */}
          {screen === "home" && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg bg-white rounded-3xl border-4 border-indigo-400 shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden"
              id="home-card"
            >
              {/* Adornos flotantes divertidos */}
              <div className="absolute top-4 left-4 text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>🌱</div>
              <div className="absolute top-6 right-6 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🎈</div>
              <div className="absolute bottom-8 left-6 text-3xl animate-bounce" style={{ animationDelay: "0.8s" }}>🎒</div>
              <div className="absolute bottom-6 right-8 text-3xl animate-bounce" style={{ animationDelay: "1.1s" }}>🌻</div>

              <div className="space-y-6 sm:space-y-8 relative z-10">
                <div className="inline-block bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-4 py-2 text-indigo-600 font-semibold text-sm tracking-wide">
                  👧🏻👦🏼 JUEGO INFANTIL PARA PRIMARIA 🏫
                </div>

                <div className="space-y-3">
                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-indigo-800 leading-tight">
                    🧩 ¡Ordena la <br />
                    <span className="text-indigo-600 relative inline-block">
                      Secuencia!
                      <svg className="absolute -bottom-2 left-0 w-full h-2 text-indigo-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                    </span>
                  </h1>
                  <p className="text-gray-600 text-lg sm:text-xl font-medium pt-2 max-w-sm mx-auto">
                    ¿Te gusta ordenar historias, números y recetas divertidas? Ayuda a poner cada globo y planta en su sitio correcto.
                  </p>
                </div>

                {/* Mascota virtual decorativa */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-4 max-w-sm mx-auto">
                  <div className="text-4xl animate-bounce">🦉</div>
                  <div className="text-left">
                    <p className="font-bold text-indigo-900 text-sm">¡Hola, super explorador/a!</p>
                    <p className="text-xs text-indigo-700 font-medium">Soy Susi. ¡Te daré pistas mágicas en cada nivel!</p>
                  </div>
                </div>

                {/* Botón táctil 3D para comenzar */}
                <button
                  onClick={handleStart}
                  className="w-full max-w-xs mx-auto py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xl shadow-lg border-b-6 border-emerald-700 hover:border-b-4 hover:translate-y-[2px] active:translate-y-[4px] active:border-b-2 transition-all duration-75 flex items-center justify-center gap-3 cursor-pointer group"
                  id="start-game-btn"
                >
                  <Play className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
                  ¡Comenzar Juego!
                </button>
              </div>
            </motion.div>
          )}

          {/* ==========================================
              PANTALLA DE JUEGO PRINCIPAL
              ========================================== */}
          {screen === "game" && (
            <motion.div
              key="game-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl bg-white rounded-3xl border-4 border-indigo-400 shadow-2xl p-5 sm:p-8 relative overflow-hidden flex flex-col"
              id="game-card"
            >
              {/* Canvas para partículas de confeti de victoria local */}
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 z-30 h-full w-full"
              />

              {/* Encabezado del nivel actual */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-2">
                <div>
                  <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
                    Desafío {currentIdx + 1} de {EXERCISES.length}
                  </div>
                  <h2 className="font-display font-bold text-2xl text-indigo-900">
                    {currentExercise.title}
                  </h2>
                </div>

                {/* Botón de reinicio rápido del nivel */}
                <button
                  onClick={handleRestartLevel}
                  className="self-start sm:self-center px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  title="Volver a mezclar tarjetas"
                  id="reset-level-btn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Mezclar de nuevo
                </button>
              </div>

              {/* Panel de Enunciado/Instrucción */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-orange-200/60 rounded-2xl p-4 mb-6 flex gap-3 items-start">
                <span className="text-2xl pt-0.5" role="img" aria-label="icono">📋</span>
                <p className="font-sans font-bold text-base sm:text-lg text-orange-900 leading-snug">
                  {currentExercise.instruction}
                </p>
              </div>

              {/* LISTA DE ELEMENTOS DESORDENADOS */}
              <div className="space-y-3.5 mb-6 relative z-10">
                <AnimatePresence initial={false}>
                  {items.map((item, index) => {
                    const isFirst = index === 0;
                    const isLast = index === items.length - 1;

                    // Determinar estado de comprobación para este elemento individual
                    let itemFeedbackIcon = null;
                    let itemBorderClass = "border-2";
                    
                    if (checked) {
                      const isCorrectlyPlaced = checkedStatus[item.id];
                      if (isCorrectlyPlaced) {
                        itemFeedbackIcon = (
                          <span className="bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-md flex items-center justify-center animate-bounce">
                            <Check className="w-4.5 h-4.5 stroke-[3]" />
                          </span>
                        );
                        itemBorderClass = "border-3 border-emerald-500 bg-emerald-50/60 shadow-md";
                      } else {
                        itemFeedbackIcon = (
                          <span className="bg-pink-500 text-white rounded-full p-1 border-2 border-white shadow-md flex items-center justify-center">
                            <X className="w-4.5 h-4.5 stroke-[3]" />
                          </span>
                        );
                        itemBorderClass = "border-3 border-pink-400 bg-pink-50/40 opacity-90";
                      }
                    }

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${
                          checked ? "" : item.color.split(" focus:")[0]
                        } ${itemBorderClass}`}
                        style={{ contentVisibility: "auto" }}
                        id={`item-${item.id}`}
                      >
                        {/* Indicador visual del orden en el que se lee */}
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-8 h-8 rounded-full bg-indigo-100 border-2 border-indigo-200 text-indigo-700 font-extrabold text-sm shadow-inner">
                          {index + 1}
                        </div>

                        {/* Emoji representativo (tamaño grande para niños) */}
                        <div className="text-4xl filter drop-shadow select-none">
                          {item.emoji}
                        </div>

                        {/* Texto descriptivo de la etapa */}
                        <div className="flex-1 min-w-0">
                          <p className="font-sans font-bold text-sm sm:text-base text-gray-800 break-words leading-tight">
                            {item.text}
                          </p>
                        </div>

                        {/* Ícono de corrección si se ha comprobado */}
                        {itemFeedbackIcon}

                        {/* BOTONES DE SUBIR Y BAJAR */}
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          {/* Botón de subir */}
                          <button
                            onClick={() => handleMove(index, "up")}
                            disabled={isFirst || isCorrect}
                            aria-label={`Mover elemento ${index + 1} hacia arriba`}
                            className={`p-2 rounded-xl border-2 font-bold transition-all cursor-pointer ${
                              isFirst
                                ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                                : "bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300 hover:border-indigo-400 shadow-sm active:translate-y-0.5"
                            }`}
                            id={`move-up-btn-${item.id}`}
                          >
                            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>

                          {/* Botón de bajar */}
                          <button
                            onClick={() => handleMove(index, "down")}
                            disabled={isLast || isCorrect}
                            aria-label={`Mover elemento ${index + 1} hacia abajo`}
                            className={`p-2 rounded-xl border-2 font-bold transition-all cursor-pointer ${
                              isLast
                                ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                                : "bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300 hover:border-indigo-400 shadow-sm active:translate-y-0.5"
                            }`}
                            id={`move-down-btn-${item.id}`}
                          >
                            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* PANEL DE PISTA / AYUDA */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-4 flex gap-3 items-start shadow-inner">
                      <span className="text-3xl animate-bounce">🦉</span>
                      <div>
                        <h4 className="font-display font-bold text-sky-950 text-sm">
                          Pista de Susi la Lechuza:
                        </h4>
                        <p className="font-sans font-medium text-xs sm:text-sm text-sky-800 leading-relaxed mt-1">
                          {currentExercise.hint}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* MENSAJES DE RESPUESTA CORRECTA / INCORRECTA */}
              <AnimatePresence>
                {checked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6"
                  >
                    {isCorrect ? (
                      <div className="bg-emerald-50 border-3 border-emerald-400 rounded-2xl p-4 text-center shadow-md">
                        <div className="text-3xl mb-1">🎉🌟 ¡SÚPER EXCELENTE! 🌟🎉</div>
                        <p className="font-sans font-bold text-emerald-800 text-sm sm:text-base">
                          ¡Increíble! Lo has ordenado a la perfección. Has ganado una estrella para tu colección.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-pink-50 border-3 border-pink-300 rounded-2xl p-4 text-center shadow-md">
                        <div className="text-3xl mb-1">🧐 ¡Casi lo tienes! 🧐</div>
                        <p className="font-sans font-bold text-pink-800 text-sm sm:text-base">
                          Algunas tarjetas aún no están en su lugar correcto. Revisa los globos marcados con una cruz roja ❌ e inténtalo de nuevo. ¡Tú puedes! 💪
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BOTONERA ACCIONES INFERIOR */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between relative z-10 border-t border-gray-100 pt-5">
                
                {/* Botón de Ayuda */}
                <button
                  onClick={() => {
                    playSound("click");
                    setShowHint(!showHint);
                  }}
                  className={`py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-b-4 ${
                    showHint
                      ? "bg-sky-200 text-sky-900 border-sky-400 border-b-2 translate-y-[2px]"
                      : "bg-sky-100 hover:bg-sky-200 text-sky-700 border-sky-300 hover:border-b-2 hover:translate-y-[2px]"
                  }`}
                  id="help-btn"
                >
                  <HelpCircle className="w-5 h-5 text-sky-600" />
                  {showHint ? "Ocultar pista 🦉" : "Pista de Susi 🦉"}
                </button>

                {/* Acciones principales: Comprobar o Siguiente */}
                <div className="flex gap-3 flex-1 sm:flex-initial">
                  {checked && !isCorrect && (
                    <button
                      onClick={handleRestartLevel}
                      className="flex-1 sm:flex-none py-3.5 px-6 rounded-2xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-b-4 border-indigo-300 hover:border-b-2 active:translate-y-[2px] transition-all font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
                      id="retry-btn"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Mezclar de nuevo
                    </button>
                  )}

                  {!isCorrect ? (
                    <button
                      onClick={handleCheck}
                      className="flex-1 sm:flex-initial py-3.5 px-8 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-lg border-b-6 border-amber-700 hover:border-b-4 hover:translate-y-[2px] active:translate-y-[4px] active:border-b-2 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      id="check-btn"
                    >
                      <Sparkles className="w-5 h-5 fill-white" />
                      ¡Comprobar! 🔍
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex-1 sm:flex-initial py-4 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xl border-b-6 border-emerald-700 hover:border-b-4 hover:translate-y-[2px] active:translate-y-[4px] active:border-b-2 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                      id="next-btn"
                    >
                      {currentIdx + 1 === EXERCISES.length ? "¡Ver mi Premio! 🏆" : "Siguiente Nivel ➡️"}
                      <ChevronRight className="w-6 h-6 stroke-[3]" />
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* ==========================================
              PANTALLA DE VICTORIA FINAL (VICTORY)
              ========================================== */}
          {screen === "victory" && (
            <motion.div
              key="victory-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="w-full max-w-lg bg-white rounded-3xl border-4 border-indigo-400 shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden"
              id="victory-card"
            >
              {/* Adornos flotantes de fiesta */}
              <div className="absolute top-4 left-4 text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>🎈</div>
              <div className="absolute top-8 right-6 text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>🎉</div>
              <div className="absolute bottom-12 left-6 text-4xl animate-bounce" style={{ animationDelay: "0.6s" }}>⭐️</div>
              <div className="absolute bottom-8 right-8 text-4xl animate-bounce" style={{ animationDelay: "0.8s" }}>🥳</div>

              <div className="space-y-6 sm:space-y-8 relative z-10">
                <div className="flex justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 10, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    className="relative"
                  >
                    <Trophy className="w-28 h-28 text-yellow-500 fill-yellow-400 filter drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-2 border-2 border-white text-xs font-bold shadow-md">
                      +100
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-indigo-900 leading-tight">
                    ¡FELICIDADES, <br />
                    SUPER EXPLORADOR/A!
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg font-semibold px-4">
                    ¡Has completado todos los desafíos del juego de manera perfecta!
                  </p>
                </div>

                {/* Colección de estrellas ganadas */}
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-5 max-w-sm mx-auto">
                  <h3 className="font-display font-bold text-indigo-900 text-sm sm:text-base mb-3 flex items-center justify-center gap-1.5">
                    <Award className="w-5 h-5 text-indigo-600" />
                    Tus Súper Estrellas Ganadas:
                  </h3>
                  <div className="flex justify-center gap-2 text-3xl">
                    {stars.map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
                        className="filter drop-shadow"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-indigo-600 mt-3 uppercase tracking-wider">
                    ¡Total: {stars.length} / {stars.length} Secuencias logradas!
                  </p>
                </div>

                {/* Susi y Lolo felicitan al niño */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-150 rounded-2xl p-4 max-w-sm mx-auto text-left">
                  <span className="text-3xl">🦉🐻</span>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">¡Estamos súper orgullosos de ti!</h4>
                    <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                      Has demostrado tener una mente súper brillante y un gran sentido del orden. ¡Sigue explorando!
                    </p>
                  </div>
                </div>

                {/* Botón táctil 3D para volver a empezar todo */}
                <button
                  onClick={handleRestartFullGame}
                  className="w-full max-w-xs mx-auto py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xl shadow-lg border-b-6 border-indigo-800 hover:border-b-4 hover:translate-y-[2px] active:translate-y-[4px] active:border-b-2 transition-all duration-75 flex items-center justify-center gap-3 cursor-pointer group"
                  id="restart-full-btn"
                >
                  <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Jugar otra vez
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white/40 border-t border-indigo-100/30 py-3 text-center px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs text-indigo-600/80 font-medium">
          <p>
            🎮 <strong>Ordena la Secuencia</strong> — Creado especialmente para niños de primaria.
          </p>
          <p>
            🧠 Promueve el razonamiento lógico, el orden espacial y la paciencia. ¡Sin anuncios ni registros!
          </p>
        </div>
      </footer>

    </div>
  );
}
