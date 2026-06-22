import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const playlistData = [
  {
    id: 1,
    artist: "Frank Sinatra",
    title: "Strangers in the Night",
    albumCover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    duration: 191,
    startAt: 144,
    youtubeUrl: "https://www.youtube.com/watch?v=268p-W7XmGo",
    description: "Más allá de ser un estándar impecable, esta es la pieza central de mi historia con Joanna. Es nuestra canción; marca el ritmo de nuestros mejores momentos juntos y tiene un valor sentimental invaluable."
  },
  {
    id: 2,
    artist: "U2",
    title: "City of Blinding Lights",
    albumCover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f08f50?w=800&auto=format&fit=crop&q=80",
    duration: 346,
    startAt: 302,
    youtubeUrl: "https://www.youtube.com/watch?v=co6WMzDOh1o",
    description: "La energía de los estadios encapsulada en código de audio. La guitarra de The Edge me inyecta una dosis inmediata de enfoque y grandilocuencia, ideal para arrancar proyectos complejos."
  },
  {
    id: 3,
    artist: "John Mayer",
    title: "Slow Dancing in a Burning Room",
    albumCover: "https://images.unsplash.com/photo-1510915361894-faa8ebcf3d46?w=800&auto=format&fit=crop&q=80",
    duration: 242,
    startAt: 85,
    youtubeUrl: "https://www.youtube.com/watch?v=32GZ3suxRn4",
    description: "La precisión técnica y el tono blues encajan perfecto con las sesiones largas de desarrollo nocturno. Un recordatorio de que la maestría técnica y la fluidez emocional deben coexistir."
  },
  {
    id: 4,
    artist: "Luis Miguel",
    title: "Hasta Que Me Olvides",
    albumCover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=80",
    duration: 280,
    startAt: 120,
    youtubeUrl: "https://www.youtube.com/watch?v=vV9_8NlU2T4",
    description: "Un tributo a la impecable producción vocal e instrumental. La elegancia atemporal en los arreglos de esta época me recuerda la importancia de entregar un producto final pulido."
  }
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function PlaylistPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(playlistData[0].startAt);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  const currentSong = playlistData[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % playlistData.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? playlistData.length - 1 : prev - 1));

  // Simulación de avance automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const duration = playlistData[currentIndexRef.current].duration;
        if (prev >= duration) {
          handleNext();
          return playlistData[currentIndexRef.current].startAt;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentTime(playlistData[currentIndex].startAt);
  }, [currentIndex]);

  const progressPercent = (currentTime / currentSong.duration) * 100;

  // ─── VARIANTES PREMUM DE ENTRADA (Mismo estilo que Inspirations) ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32 flex flex-col items-center"
  >
      
      {/* ─── CABECERA ─── */}
      <motion.section variants={itemVariants} className="text-center mb-16 px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-gray-900">
          My playlist
        </h1>
        <p className="text-gray-500 font-light text-lg max-w-xl mx-auto leading-relaxed">
          El soundtrack que dicta el compás de mis sesiones de código y los momentos más valiosos de mi vida.
        </p>
      </motion.section>

      {/* ─── TARJETA UNIFICADA (Con Blur reveal heredado de itemVariants) ─── */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-4xl bg-[#111827] rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 shadow-2xl relative overflow-hidden mx-4"
      >
        {/* Fondo sutil borroso */}
        <div className="absolute inset-0 z-0 opacity-20 blur-[100px] pointer-events-none transition-all duration-1000 select-none">
          <img src={currentSong.albumCover} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Lado Izquierdo: Portada */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex-shrink-0 relative z-10">
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black/40 shadow-xl relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSong.id}
                src={currentSong.albumCover}
                alt={currentSong.title}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }}
                className="w-full h-full object-cover absolute inset-0 select-none"
                draggable="false"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Lado Derecho: Contenido e Historia */}
        <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col justify-between relative z-10 py-2">
          <div>
            {/* Título y Artista */}
            <div className="overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSong.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2 block">
                    Track {currentIndex + 1} of {playlistData.length}
                  </span>
                  <h3 className="text-white font-medium text-2xl md:text-3xl tracking-tight mb-1 truncate">
                    {currentSong.title}
                  </h3>
                  <p className="text-white/50 text-base md:text-lg font-light truncate">
                    {currentSong.artist}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Historia Narrativa */}
            <div className="h-auto min-h-[96px] mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSong.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 font-light text-sm md:text-base leading-relaxed"
                >
                  {currentSong.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Progreso y Controles */}
          <div className="mt-auto">
            <div className="mb-6">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/80 rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono tracking-wider text-white/30">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(currentSong.duration - currentTime)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              {/* Prev */}
              <motion.button
                onClick={handlePrev}
                className="text-white/40 hover:text-white transition-colors p-2 -ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5.14v13.72a1.5 1.5 0 01-2.27 1.28L10 15.3v3.2a1.5 1.5 0 01-3 0V5.5a1.5 1.5 0 013 0v3.2L16.73 3.86A1.5 1.5 0 0119 5.14z" />
                </svg>
              </motion.button>

              {/* Redirección YouTube */}
              <motion.a
                href={currentSong.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-100 shadow-lg transition-colors select-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch & Listen
              </motion.a>

              {/* Next */}
              <motion.button
                onClick={handleNext}
                className="text-white/40 hover:text-white transition-colors p-2 -mr-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5.14v13.72a1.5 1.5 0 002.27 1.28L14 15.3v3.2a1.5 1.5 0 003 0V5.5a1.5 1.5 0 00-3 0v3.2L7.27 3.86A1.5 1.5 0 005 5.14z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── TRACK SELECTOR (Píldoras inferiores que también heredan el cascading) ─── */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-3 mt-10 px-4 max-w-4xl"
      >
        {playlistData.map((song, i) => (
          <motion.button
            key={song.id}
            onClick={() => setCurrentIndex(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors duration-300 border ${
              i === currentIndex
                ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
              <img src={song.albumCover} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-medium truncate max-w-[120px] md:max-w-[150px]">
              {song.title}
            </span>
          </motion.button>
        ))}
      </motion.div>

    </motion.div>
  );
}