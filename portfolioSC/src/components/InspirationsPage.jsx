import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── COMPONENTE INDIVIDUAL DE TARJETA GIRATORIA ───
const FlipCard = ({ item, variants }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`relative group cursor-pointer h-full min-h-[480px] md:min-h-[520px] ${item.colSpan}`}
      style={{ perspective: 1500 }} // Le da profundidad 3D al giro
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }} // Efecto resorte industrial
      >
        
        {/* ─── CARA FRONTAL (FOTO Y TÍTULO) ─── */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-end"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Contenedor de la imagen (Ocupa todo el frente) */}
          <div className="absolute inset-0 w-full h-full bg-gray-100">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-110"
            />
            {/* Gradiente oscuro para que el texto sea siempre legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Texto Frontal sobre la imagen */}
          <div className="relative z-10 p-8 md:p-10">
            <span className="text-xs font-semibold tracking-widest text-white/70 uppercase mb-2 block">
              {item.overline}
            </span>
            <div className="flex justify-between items-end">
              <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
                {item.title}
              </h3>
              {/* Icono de + que indica interactividad */}
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CARA TRASERA (DESCRIPCIÓN) ─── */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#111827] rounded-2xl overflow-hidden shadow-xl p-8 md:p-12 flex flex-col justify-center text-center items-center border border-gray-800"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)" // Esta cara ya está volteada por defecto
          }}
        >
           <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6 block">
              Por qué me inspira
            </span>
            <p className="text-gray-200 font-serif italic text-xl md:text-2xl leading-relaxed max-w-sm">
              "{item.description}"
            </p>
            
            {/* Botón para cerrar */}
            <div className="mt-10 text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              Volver
            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};


// ─── COMPONENTE PRINCIPAL ───
export default function InspirationsPage() {
  const inspirations = [
    // La mamá ahora es la tarjeta más grande
    {
      id: 1,
      overline: "Mi Mamá",
      title: "Dulce Nancy",
      description: "La persona que más admiro. De ella aprendí que el amor se demuestra con presencia.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
      colSpan: "md:col-span-2", 
    },
    // La pareja pasa a ser una tarjeta normal
    {
      id: 2,
      overline: "Mi Pareja",
      title: "Joanna",
      description: "Mi razón favorita para esforzarme cada día. En ella encontré calma, dirección y un hogar que cabe en una persona.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd785311026?w=800&auto=format&fit=crop&q=80",
      colSpan: "md:col-span-1",
    },
    {
      id: 3,
      overline: "Mi Mascota",
      title: "Nacho",
      description: "Me enseñó que la lealtad incondicional existe de verdad.",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80",
      colSpan: "md:col-span-1",
    },
    {
      id: 4,
      overline: "Tenista",
      title: "Roger Federer",
      description: "Elegancia bajo presión. Me recuerda que la excelencia y la gracia pueden coexistir.",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&auto=format&fit=crop&q=80",
      colSpan: "md:col-span-1",
    },
    {
      id: 5,
      overline: "Libro",
      title: "El vino a darle libertad a los cautivos",
      description: "Una lectura profunda que transformó mi perspectiva y redefinió mi comprensión de la libertad personal.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80",
      colSpan: "md:col-span-1",
    }
  ];

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
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32">
      
      {/* Cabecera de la página */}
      <section className="text-center mb-20 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
        >
          My inspirations
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Las personas, historias y presencias que dan forma a quien soy. Haz clic en las tarjetas para descubrir por qué.
        </motion.p>
      </section>

      {/* Grid estilo Bento con Flip Cards */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {inspirations.map((item) => (
            <FlipCard key={item.id} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </section>

    </div>
  );
}