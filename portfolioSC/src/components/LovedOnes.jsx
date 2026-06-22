import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// ─── COMPONENTE INDIVIDUAL DE TESTIMONIO CON FÍSICA 3D ───
const InteractiveTestimonialCard = ({ item }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [3, -3]);
  const rotateY = useTransform(x, [0, 1], [-3, 3]);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000
      }}
      className="w-[350px] md:w-[400px] flex-shrink-0 border border-gray-100 rounded-2xl p-8 bg-white flex flex-col justify-between min-h-[260px] select-none mx-3 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: useTransform(x, [0, 1], [-5, 5]),
          y: useTransform(y, [0, 1], [-5, 5]),
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* 🔥 TIPOGRAFÍA ELEGANTE APLICADA AQUÍ */}
        <p className="text-gray-600 italic font-light text-lg md:text-xl leading-relaxed mb-8">
         {item.quote}
        </p>

        
        <div className="flex items-center gap-4 mt-auto">
          <motion.img 
            style={{
              x: useTransform(x, [0, 1], [-3, 3]),
              y: useTransform(y, [0, 1], [-3, 3]),
            }}
            src={item.avatar} 
            alt={item.name} 
            className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            draggable="false"
          />
          <motion.div
            style={{
              x: useTransform(x, [0, 1], [-2, 2]),
            }}
          >
            <h4 className="text-sm font-semibold text-gray-900 tracking-tight">{item.name}</h4>
            <p className="text-xs text-gray-500 font-light">{item.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


// ─── COMPONENTE PRINCIPAL ───
export default function LovedOnes() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote: "“Santiago siempre ha sido muy respetuoso y enfocado en sus objetivos.”",
      name: "Dulce Nancy",
      description: "Madre",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      quote: "“Una persona sumamente responsable. Manejó nuestras configuraciones de red y servidores con precisión técnica impecable.”",
      name: "Inge",
      description: "Ex Jefe / Supervisor Técnico",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      quote: "“Tiene un corazón genuinamente brillante. Su nivel de detalle y lógica, incluso para organizar nuestros ahorros compartidos, es increíble.”",
      name: "Joanna",
      description: "Pareja",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      quote: "“Gran capacidad de resolución de problemas y adaptabilidad en el desarrollo de software multiplataforma.”",
      name: "Profesor UTNeza",
      description: "Mentor Académico",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-28 border-t border-gray-100 overflow-hidden relative">
      
      {/* 🔥 VELOCIDAD DEL SCROLL REDUCIDA AQUÍ (de 40s a 70s) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 70s linear infinite;
        }
      `}</style>

      {/* HEADER */}
      <div className="flex justify-between items-end mb-14">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif tracking-wide text-gray-900"
        >
          Loved ones
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-gray-400 select-none"
        >
          <span className="text-xs tracking-widest font-medium uppercase hidden md:block">
            {isPaused ? 'PAUSED' : 'AUTO SCROLL'}
          </span>
          <div className="w-10 h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
            <motion.div
              animate={isPaused ? { x: "0%" } : { x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className={`absolute w-1/2 h-full rounded-full ${isPaused ? 'bg-gray-300' : 'bg-gray-800'}`}
            />
          </div>
        </motion.div>
      </div>

      {/* CONTENEDOR DEL CARRUSEL */}
      <div 
        className="flex overflow-hidden group cursor-grab active:cursor-grabbing pb-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{ perspective: 1200 }}
      >
        <div 
          className="flex animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          <div className="flex">
            {testimonials.map(item => <InteractiveTestimonialCard key={`copy1-${item.id}`} item={item} />)}
          </div>
          <div className="flex">
            {testimonials.map(item => <InteractiveTestimonialCard key={`copy2-${item.id}`} item={item} />)}
          </div>
        </div>
      </div>

    </section>
  );
}