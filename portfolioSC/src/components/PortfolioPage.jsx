import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── DICCIONARIO DE ICONOS SVG PARA TECNOLOGÍAS ───
const techIcons = {
  "React Native": <path d="M11.955 2.564c-.035 0-.07.002-.104.004-.336.02-.638.163-.872.4-.234.237-.375.54-.393.877-.03 2.08-1.077 4.1-2.923 5.672-1.846 1.571-4.225 2.502-6.526 2.574-.337.01-.645.15-.884.383-.238.233-.38.544-.39.882-.01.338.113.655.337.896.223.24.522.392.858.412 2.3.136 4.654 1.134 6.47 2.766 1.816 1.632 2.825 3.702 2.784 5.782-.016.337.114.653.338.892.224.24.524.39.86.41.338.01.646-.12.884-.354.24-.233.39-.533.414-.868.083-2.08 1.182-4.116 3.06-5.717 1.878-1.601 4.296-2.553 6.634-2.628.337-.01.646-.14.886-.374.24-.233.385-.544.396-.882.01-.338-.112-.656-.336-.897-.223-.24-.522-.39-.858-.41-2.34-.138-4.74-1.15-6.59-2.812-1.85-1.662-2.88-3.755-2.846-5.836.015-.337-.11-.655-.333-.896-.22-.24-.517-.39-.852-.41-.035-.002-.07-.003-.105-.003z"/>,
  "React": <path d="M11.955 2.564c-.035 0-.07.002-.104.004-.336.02-.638.163-.872.4-.234.237-.375.54-.393.877-.03 2.08-1.077 4.1-2.923 5.672-1.846 1.571-4.225 2.502-6.526 2.574-.337.01-.645.15-.884.383-.238.233-.38.544-.39.882-.01.338.113.655.337.896.223.24.522.392.858.412 2.3.136 4.654 1.134 6.47 2.766 1.816 1.632 2.825 3.702 2.784 5.782-.016.337.114.653.338.892.224.24.524.39.86.41.338.01.646-.12.884-.354.24-.233.39-.533.414-.868.083-2.08 1.182-4.116 3.06-5.717 1.878-1.601 4.296-2.553 6.634-2.628.337-.01.646-.14.886-.374.24-.233.385-.544.396-.882.01-.338-.112-.656-.336-.897-.223-.24-.522-.39-.858-.41-2.34-.138-4.74-1.15-6.59-2.812-1.85-1.662-2.88-3.755-2.846-5.836.015-.337-.11-.655-.333-.896-.22-.24-.517-.39-.852-.41-.035-.002-.07-.003-.105-.003z"/>,
  "Node.js": <path d="M12.004 0L1.75 5.922v12.156L12.004 24l10.246-5.922V5.922zM10.875 18.59l-.004-.002a2.383 2.383 0 01-1.077-.282A5.626 5.626 0 016.9 16.48l1.325-1.464a4.42 4.42 0 002.394 1.5c1.084.28 2.21-.186 2.456-.732.18-.396-.065-.898-1.07-1.19l-1.396-.397c-1.928-.548-2.656-1.942-2.308-3.21.36-1.314 1.76-2.193 3.498-2.193a5.535 5.535 0 013.25 1.053l-1.158 1.543a4.015 4.015 0 00-2.18-1.002c-.933-.147-1.803.18-1.968.614-.15.397.106.812.99 1.066l1.373.39c2.148.608 2.8 2.052 2.382 3.454-.42 1.408-1.968 2.316-3.615 2.316-.002.002-.002.002 0 .002zm6.27-.478V8.92h2.003v10.514c0 .066-.022.12-.06.155a.2.2 0 01-.15.056h-1.637a.2.2 0 01-.144-.055.205.205 0 01-.06-.153z"/>,
  "MySQL": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>,
  "AP Config": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/>,
  "Vite": <path d="M23.692 4.237c-.12-.423-.5-.733-.94-.775l-21.2-.988c-.463-.02-.876.242-1.026.657-.15.413-.01.884.34 1.156l10.82 8.358V23.47c0 .445.313.834.75.955.438.12.905-.064 1.15-.456l10.45-18.452c.23-.393.18-.887-.14-1.233l-.2-.047zM11.666 11.39l-8.625-6.66 17.514.815-8.89 15.703V11.39z"/>,
  "Framer Motion": <path d="M12 0L24 12H12v12L0 12h12V0z"/>,
  "PWA": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
};

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "LabStock",
      category: "Industrial IoT & Inventory Intelligence",
      description: "Sistema móvil diseñado para el área de calidad de Aguakan. Transformé procesos manuales en Excel a una plataforma centralizada que eliminó discrepancias de inventario y digitalizó certificados de seguridad en tiempo real.",
      metrics: [
        { val: "90%", label: "Optimización de Tiempos" },
        { val: "10m a 45s", label: "Registro de entrada" },
        { val: "< 1%", label: "Merma por caducidad" },
        { val: "$0", label: "Costo de Licenciamiento" }
      ],
      problem: "Pérdida de 1.5 horas diarias por usuario en transcripciones manuales y 20% de discrepancia en stock físico.",
      solution: "Arquitectura Cliente-Servidor local con despliegue de red independiente para alta disponibilidad.",
      techStack: ["React Native", "Node.js", "MySQL", "AP Config"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=90", 
      align: "left"
    },
    {
      id: 2,
      title: "Limencia",
      category: "PWA & Telemedicine Ecosystem",
      description: "Estructuración de una Progressive Web App con sistema de triaje automatizado. El enfoque fue la gamificación de la salud y la geolocalización para servicios médicos inmediatos.",
      metrics: [
        { val: "Zero", label: "Latencia Percibida" },
        { val: "PWA", label: "Multiplataforma Nativa" },
        { val: "GPS", label: "Rastreo de Geolocalización" },
        { val: "Safe", label: "Data Médica Encriptada" }
      ],
      problem: "Fragmentación en el acceso a servicios de salud y falta de seguimiento intuitivo del paciente.",
      solution: "Interfaz fluida orientada al usuario final con tiempos de carga optimizados mediante Vite.",
      techStack: ["React", "Vite", "Framer Motion", "PWA"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=90",
      align: "right"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32 selection:bg-black selection:text-white">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-6">
        
        {/* ─── HERO SECTION ─── */}
        <motion.section variants={fadeInUp} className="mb-40 max-w-4xl">
          <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 block">
            Portfolio 2024
          </span>
          <h1 className="text-7xl md:text-9xl font-serif mb-8 tracking-tighter leading-none">
            Digital<br/><span className="text-gray-400">Architecture.</span>
          </h1>
          <p className="text-gray-500 font-light text-xl md:text-2xl leading-relaxed max-w-2xl">
            Soluciones robustas disfrazadas de interfaces minimalistas. Traduciendo problemas de negocio complejos en código escalable.
          </p>
        </motion.section>

        {/* ─── SHOWCASE INMERSIVO ─── */}
        <div className="space-y-48">
          {projects.map((project) => (
            <motion.section 
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className={`flex flex-col gap-16 lg:gap-24 ${project.align === "left" ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Bloque de Imagen con Problemática en Hover */}
              <div className="w-full md:w-1/2 group relative">
                <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3] shadow-2xl transition-all duration-700 group-hover:shadow-black/10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0"
                  />
                  {/* Overlay Informativo */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm p-8 md:p-12">
                    <div className="text-white text-center">
                      <p className="text-xs tracking-widest uppercase mb-4 text-gray-300 italic font-medium">Problemática</p>
                      <p className="text-lg font-light leading-relaxed">"{project.problem}"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque de Texto y Detalles */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                  {project.category}
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 tracking-tighter">
                  {project.title}
                </h2>
                
                <p className="text-gray-500 font-light text-lg md:text-xl leading-relaxed mb-10">
                  {project.description}
                </p>

                {/* ─── SEPARADOR SUTIL ─── */}
                <hr className="border-t-[1.5px] border-gray-200 mb-10" />

                {/* Grid de Resultados / Métricas */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  {project.metrics.map((m, i) => (
                    <div key={i}>
                      <p className="text-xl md:text-2xl font-serif text-gray-900">{m.val}</p>
                      <p className="text-xs text-gray-500 font-light mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Solución Central */}
                <div className="mb-10 bg-gray-100 p-5 rounded-2xl border border-gray-200 md:-ml-5 shadow-sm">
                   <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-500">Core Solution</p>
                   <p className="text-sm text-gray-800 font-medium italic leading-relaxed">"{project.solution}"</p>
                </div>

                {/* Tech Stack con Iconos */}
                <div className="flex flex-wrap gap-2 mb-12">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-gray-600 tracking-wide flex items-center gap-2 shadow-sm">
                      {techIcons[tech] ? (
                        <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill={tech === 'MySQL' || tech === 'AP Config' || tech === 'PWA' ? 'none' : 'currentColor'}>
                          {techIcons[tech]}
                        </svg>
                      ) : null}
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botón Caso de Estudio */}
                <Link 
                  to={`/case-study/${project.id}`} 
                  className="group flex items-center gap-4 text-sm font-medium text-gray-900 w-fit"
                >
                  Ver Full Case Study
                  <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500 shadow-sm">
                    <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                </Link>
              </div>
            </motion.section>
          ))}
        </div>

      </motion.div>
    </div>
  );
}