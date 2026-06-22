import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ─── COMPONENTE INDIVIDUAL DE TARJETA CON FÍSICA 3D ───
// Extraemos la tarjeta a su propio componente para aislar los cálculos del ratón
function InteractiveCard({ card, variants }) {
  const navigate = useNavigate();

  // 1. Valores de movimiento (de 0 a 1 representando el porcentaje de la tarjeta)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // 2. Transformamos la posición del ratón en grados de rotación muy sutiles (-4 a 4 grados)
  const rotateX = useTransform(y, [0, 1], [4, -4]);
  const rotateY = useTransform(x, [0, 1], [-4, 4]);

  // 3. Suavizamos el movimiento con resortes (física de Apple) para que no se sienta rígido
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // 4. Manejador de eventos del ratón
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculamos qué tan lejos está el ratón de los bordes izquierdo y superior (0 a 1)
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    // Al salir, la tarjeta regresa suavemente a su posición neutral (centro)
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8 }} // Mantiene el pequeño salto vertical elegante
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (card.link) {
          navigate(card.link);
          window.scrollTo(0, 0);
        }
      }}
      // Aplicamos la rotación calculada al contenedor principal
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000 // Le da profundidad 3D
      }}
      className="group cursor-pointer flex flex-col"
    >
      {/* Contenedor de la Imagen */}
      <div className="overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <motion.img 
          src={card.image} 
          alt={card.title}
          // Un ligero parallax a la imagen misma en sentido opuesto al contenedor crea el efecto de profundidad
          style={{
            x: useTransform(x, [0, 1], [-10, 10]),
            y: useTransform(y, [0, 1], [-10, 10]),
          }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-105 transition-all duration-700 ease-out" 
        />
      </div>

      {/* Texto de la tarjeta */}
      <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center justify-between">
        {card.title}
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light translate-x-[-10px] group-hover:translate-x-0">
          →
        </span>
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed font-light">
        {card.text}
      </p>
    </motion.div>
  );
}


// ─── COMPONENTE PRINCIPAL ───
export default function Interests() {
  const cards = [
    {
      id: 1,
      title: "My hobbies",
      text: "Apasionado por la restauración de mecánicas clásicas, los videojuegos de simulación y el ensamble de piezas detalladas. Encuentro la misma satisfacción armando un bloque físico que estructurando código limpio.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60",
      link: "/hobbies"
    },
    {
      id: 2,
      title: "My inspirations",
      text: "Me inspira el diseño de interfaces limpias, la arquitectura de software bien optimizada y los sistemas centralizados que resuelven problemas cotidianos de forma intuitiva.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
      link: "/inspirations"
    },
    {
      id: 3,
      title: "My playlist",
      text: "Una combinación de tributos de jazz contemporáneo y ritmos instrumentales que dictan el compás ideal para las largas sesiones de desarrollo y programación nocturna.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60",
      link: "/playlist"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-200">
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-serif mb-12 tracking-wide"
      >
        A little about me
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        // style={{ perspective: 1000 }} ayuda a que el contexto 3D funcione mejor en el contenedor padre
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        style={{ perspective: 1200 }}
      >
        {cards.map((card) => (
          // Llamamos a nuestro nuevo componente y le pasamos sus datos y variantes
          <InteractiveCard key={card.id} card={card} variants={cardVariants} />
        ))}
      </motion.div>
    </section>
  );
}