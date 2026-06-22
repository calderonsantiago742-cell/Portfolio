import { motion } from 'framer-motion';

export default function HobbiesPage() {
  const hobbiesData = [
    {
      id: 1,
      title: "Restauración Automotriz",
      align: "left",
      description: "El proceso de devolver a la vida la mecánica de un clásico exige una paciencia absoluta. Desarmar, limpiar, conseguir refacciones y ajustar cada componente del motor de un VW Sedán me ha enseñado que los grandes sistemas se construyen cuidando los detalles más pequeños.",
      imgPrimary: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1622204562446-0ce6da25a075?w=500&auto=format&fit=crop&q=80" 
    },
    {
      id: 2,
      title: "Modelado y Ensamble",
      align: "right",
      description: "Encuentro una profunda relajación en la construcción estructurada. Ensamblar sets de Lego no es muy distinto a programar: tomas piezas individuales aparentemente simples y sigues una arquitectura lógica para crear una estructura compleja y sólida paso a paso.",
      imgPrimary: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1587650756086-4fdfa0db5e1e?w=500&auto=format&fit=crop&q=80" 
    },
    {
      id: 3,
      title: "Gaming & Simulación",
      align: "left",
      description: "Desde gestionar rutas logísticas complejas en simuladores hasta la inmersión técnica en narrativas como God of War o construir mundos en Minecraft. El PC Gaming me permite explorar entornos virtuales y apreciar la increíble ingeniería de software detrás de cada motor gráfico moderno.",
      imgPrimary: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?w=500&auto=format&fit=crop&q=80" 
    }
  ];

  return (
    // AQUÍ ESTÁ EL CAMBIO: pt-40 md:pt-48 en lugar de pt-24
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32">
      
      {/* Cabecera de la página */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
        >
          My hobbies
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Las disciplinas fuera del código que forman mi enfoque, nutren mi creatividad y mantienen mi mente afilada.
        </motion.p>
      </section>

      {/* Lista de Hobbies */}
      <section className="max-w-6xl mx-auto px-4 space-y-32 md:space-y-48">
        {hobbiesData.map((hobby, index) => {
          const isLeft = hobby.align === "left";

          return (
            <motion.div 
              key={hobby.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
              className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'}`}
            >
              
              {/* Título */}
              <h2 className="text-4xl md:text-5xl font-serif mb-10 tracking-wide text-gray-900">
                {hobby.title}
              </h2>

              {/* Grid Asimétrico de Imágenes */}
              <div className={`w-full flex flex-col md:flex-row gap-6 mb-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-3/5 overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] md:aspect-video shadow-sm">
                  <img 
                    src={hobby.imgPrimary} 
                    alt={hobby.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
                
                <div className="w-full md:w-2/5 overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] md:aspect-square shadow-sm mt-0 md:mt-12">
                  <img 
                    src={hobby.imgSecondary} 
                    alt={`${hobby.title} detalle`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
              </div>

              {/* Texto Descriptivo */}
              <p className={`text-gray-500 font-light leading-relaxed max-w-xl text-lg ${isLeft ? 'text-left' : 'text-right'}`}>
                {hobby.description}
              </p>

            </motion.div>
          );
        })}
      </section>

    </div>
  );
}