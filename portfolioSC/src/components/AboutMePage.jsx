import { motion } from 'framer-motion';
import miFoto from '../assets/yo.png';

export default function AboutMePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  // Base de datos de Skills con Iconos SVG Minimalistas
  const skillsData = [
    { name: 'React', icon: <path d="M11.955 2.564c-.035 0-.07.002-.104.004-.336.02-.638.163-.872.4-.234.237-.375.54-.393.877-.03 2.08-1.077 4.1-2.923 5.672-1.846 1.571-4.225 2.502-6.526 2.574-.337.01-.645.15-.884.383-.238.233-.38.544-.39.882-.01.338.113.655.337.896.223.24.522.392.858.412 2.3.136 4.654 1.134 6.47 2.766 1.816 1.632 2.825 3.702 2.784 5.782-.016.337.114.653.338.892.224.24.524.39.86.41.338.01.646-.12.884-.354.24-.233.39-.533.414-.868.083-2.08 1.182-4.116 3.06-5.717 1.878-1.601 4.296-2.553 6.634-2.628.337-.01.646-.14.886-.374.24-.233.385-.544.396-.882.01-.338-.112-.656-.336-.897-.223-.24-.522-.39-.858-.41-2.34-.138-4.74-1.15-6.59-2.812-1.85-1.662-2.88-3.755-2.846-5.836.015-.337-.11-.655-.333-.896-.22-.24-.517-.39-.852-.41-.035-.002-.07-.003-.105-.003z"/> },
    { name: 'TypeScript', icon: <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.594 18.86c-1.397 1.196-3.09 1.666-5.187 1.488-1.748-.148-3.32-.937-4.42-2.213-.377-.436-.263-1.042.203-1.34l1.458-.934c.488-.314 1.12-.19 1.464.27 1.055 1.413 2.502 1.576 3.493 1.055.672-.353 1.053-.946 1.053-1.652 0-2.36-6.195-1.002-6.195-5.592 0-1.89 1.168-3.324 3.195-3.834 1.523-.38 3.193-.016 4.385 1.026.425.372.482 1.01.126 1.458l-1.312 1.644c-.332.417-.95.502-1.4.195-1.01-.683-2.193-.837-3.047-.396-.583.303-.84.81-.84 1.343 0 2.222 6.194 1.12 6.194 5.568 0 2.102-1.603 4.095-4.453 4.298zM9.475 10.33h-3.69v11.16H1.97V10.33H-1.72V7.172h11.195v3.158z" /> },
    { name: 'Python', icon: <path d="M12.012 2.25c-4.275 0-4.045 1.838-4.045 1.838l-.013 1.89h4.135v.568H6.55s-3.522.083-3.522 3.652c0 3.568 1.954 3.738 1.954 3.738h1.282v-1.804s-.044-2.52 2.457-2.52h3.633s2.34-.055 2.34-2.28V4.386s.187-2.136-2.682-2.136zm-2.03 1.365a.774.774 0 110 1.547.774.774 0 010-1.547zm6.473 3.96s-1.954-.083-1.954-3.738h-1.282v1.805s.045 2.52-2.458 2.52H7.127s-2.34.055-2.34 2.28v2.946s-.187 2.136 2.683 2.136c4.274 0 4.044-1.837 4.044-1.837l.014-1.89h-4.136v-.568h5.538s3.522-.083 3.522-3.652z" /> },
    { name: 'Git', icon: <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.738 2.738c.64-.22 1.383-.076 1.895.436.845.845.845 2.215 0 3.06-.845.845-2.215.845-3.06 0-.528-.528-.667-1.29-.427-1.942l-2.656-2.656c-.253.076-.525.076-.778 0l-1.32 1.32v4.86c.214.223.364.51.41.835.087.625-.138 1.257-.614 1.733-.845.845-2.215.845-3.06 0-.845-.845-.845-2.215 0-3.06.476-.476 1.108-.7 1.733-.614.326.046.612.196.835.41V9.704c-.223-.214-.373-.501-.42-.826-.086-.615.132-1.238.598-1.704L5.342 4.015.454 8.903c-.605.605-.605 1.585 0 2.189l10.48 10.478c.605.605 1.585.605 2.188 0l10.424-10.42c.605-.605.605-1.584 0-2.188V10.93z" /> },
    { name: 'Figma', icon: <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm8-16a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /> },
    { name: 'Tailwind', icon: <path d="M12 5.5c-2.667 0-4.333 1.333-5 4 1.333-2 2.667-2.333 4-1.5.852.533 1.462 1.144 2.148 1.83C14.238 10.92 15.545 12.5 20 12.5c2.667 0 4.333-1.333 5-4-1.333 2-2.667 2.333-4 1.5-.852-.533-1.462-1.144-2.148-1.83C17.762 7.08 16.455 5.5 12 5.5zM7 11.5c-2.667 0-4.333 1.333-5 4 1.333-2 2.667-2.333 4-1.5.852.533 1.462 1.144 2.148 1.83C9.238 16.92 10.545 18.5 15 18.5c2.667 0 4.333-1.333 5-4-1.333 2-2.667 2.333-4 1.5-.852-.533-1.462-1.144-2.148-1.83C12.762 13.08 11.455 11.5 7 11.5z" /> },
    { name: 'Vue.js', icon: <path d="M14.614 3.46l-2.614 4.529-2.614-4.529H2.8l9.2 15.935 9.2-15.935h-6.586zM12 11.39l-4.58-7.93H.842L12 22.532 23.158 3.46h-6.578L12 11.39z" /> },
    { name: 'JavaScript', icon: <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.463.69-.748 1.305-.748.81 0 1.38.304 1.635.88l2.673-1.71c-.72-1.44-2.34-2.19-4.35-2.19-1.92 0-3.51.81-4.245 2.13-.54 1.005-.555 2.22-.09 3.195.54 1.08 1.605 1.65 3.18 2.28 1.23.495 1.77.72 2.01 1.26.15.345.165.72.03 1.05-.21.495-.81.825-1.5.825-.84 0-1.635-.375-2.07-1.065-.24-.39-.42-.87-.495-1.38L12.57 20.25c.345 1.29 1.305 2.37 2.745 2.94 1.155.45 2.475.48 3.615.12 1.305-.435 2.34-1.38 2.82-2.64.48-1.275.465-2.835-.06-4.005h.344zm-11.4 1.95c-.375.33-.87.495-1.485.495-.69 0-1.185-.195-1.575-.54-.39-.33-.615-.81-.72-1.335H3.774c.165 1.575 1.02 2.835 2.34 3.495 1.035.54 2.25.645 3.39.315 1.155-.315 2.07-1.035 2.52-2.07.45-1.02.48-2.22.105-3.255C11.59 15.6 11 12.87 11 9.93H7.725v8.085c0 1.035-.12 1.74-.465 2.211z" /> }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pt-32 pb-32 overflow-hidden">
      {/* ─── HEADER ALINEADO A MAX-W-6XL ─── */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ─── HEADER / FOTOS ─── */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-16 mb-40">
          
          {/* Texto de la Izquierda */}
          <div className="w-full md:w-1/2 flex flex-col items-start z-10">
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4 block">
              About me
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-gray-900 mb-6 tracking-tight leading-none">
              Santiago Calderón
            </h1>
            <p className="text-gray-500 font-light text-xl leading-relaxed max-w-lg mb-10">
              Desarrollador de software multiplataforma. Construyo experiencias digitales donde la técnica y el diseño trabajan juntos.
            </p>
            <button className="bg-[#111827] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-black hover:scale-105 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download CV
            </button>
          </div>

          {/* Galería "Apple Stack" de la Derecha (AHORA MÁS GRANDE) */}
          <div className="w-full md:w-1/2 h-[550px] relative flex justify-center items-center group cursor-default">
            
            <motion.div 
              initial={{ opacity: 0, x: 0, y: 50, rotate: 0 }}
              animate={{ opacity: 1, x: -50, y: -20, rotate: -8 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="absolute w-64 h-80 rounded-2xl overflow-hidden shadow-xl bg-white border-[6px] border-white z-0 group-hover:-translate-x-20 group-hover:-rotate-12 transition-transform duration-500 ease-out"
            >
              <img src={miFoto} alt="Santiago 1" className="w-full h-full object-cover grayscale-[30%]" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 0, y: 50, rotate: 0 }}
              animate={{ opacity: 1, x: 70, y: -60, rotate: 12 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="absolute w-64 h-80 rounded-2xl overflow-hidden shadow-xl bg-white border-[6px] border-white z-10 group-hover:translate-x-24 group-hover:rotate-16 transition-transform duration-500 ease-out"
            >
              <img src={miFoto} alt="Santiago 2" className="w-full h-full object-cover grayscale-[30%]" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 100, rotate: -20 }}
              animate={{ opacity: 1, y: 40, x: 10, rotate: -2 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="absolute w-72 h-96 rounded-2xl overflow-hidden shadow-2xl bg-white border-[6px] border-white z-20 group-hover:scale-105 group-hover:-translate-y-4 transition-transform duration-500 ease-out"
            >
              <img src={miFoto} alt="Santiago Principal" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.section>

        {/* ─── GRID JUSTIFICADO (IZQUIERDA: SKILLS/LANGUAGES | DERECHA: ED/CERTS) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* COLUMNA IZQUIERDA */}
          <div>
            {/* ─── SKILLS CON ICONOS ─── */}
            <motion.section variants={itemVariants} className="mb-20">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8 block">
                Skills
              </span>
              <div className="flex flex-wrap gap-3">
                {skillsData.map((skill) => (
                  <motion.span 
                    whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                    key={skill.name} 
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium shadow-sm flex items-center gap-2.5 cursor-default hover:border-gray-300 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                      {skill.icon}
                    </svg>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* ─── LANGUAGES ANIMADOS ─── */}
            <motion.section variants={itemVariants}>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8 block">
                Languages
              </span>
              <div className="space-y-8 max-w-sm">
                
                <div className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-base font-medium text-gray-900">Español</span>
                    <span className="text-xs text-gray-400 font-light">Nativo</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '100%' }} 
                      viewport={{ once: true }} 
                      transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.1 }} 
                      className="absolute left-0 top-0 h-full bg-gray-900 rounded-full" 
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-base font-medium text-gray-900">English</span>
                    <span className="text-xs text-gray-400 font-light">B1 Intermedio</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '60%' }} 
                      viewport={{ once: true }} 
                      transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.3 }} 
                      className="absolute left-0 top-0 h-full bg-gray-900 rounded-full" 
                    />
                  </div>
                </div>

              </div>
            </motion.section>
          </div>

          {/* COLUMNA DERECHA */}
          <div>
            {/* ─── EDUCATION (TIMELINE ANIMADO) ─── */}
            <motion.section variants={itemVariants} className="mb-20">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-10 block">
                Education
              </span>
              
              <div className="relative pl-8 space-y-12">
                {/* Línea animada de fondo */}
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-[3px] top-2 w-[2px] bg-gray-200 -z-10"
                />

                {/* Item 1 */}
                <motion.div whileHover={{ x: 5 }} className="relative transition-transform cursor-default group">
                  <motion.div 
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="absolute -left-[35px] top-1.5 w-3 h-3 bg-white border-[3px] border-gray-300 rounded-full group-hover:border-gray-500 transition-colors"
                  />
                  <p className="text-xs text-gray-400 mb-1 tracking-widest font-medium">2019 — 2022</p>
                  <p className="text-sm text-gray-500 font-light mb-1">CETIS / CBTis</p>
                  <h4 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors">Técnico en Informática</h4>
                </motion.div>

                {/* Item 2 */}
                <motion.div whileHover={{ x: 5 }} className="relative transition-transform cursor-default group">
                  {/* Punto animado interior */}
                  <motion.div 
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
                    className="absolute -left-[35px] top-1.5 w-3 h-3 bg-gray-900 border-[3px] border-gray-900 rounded-full z-10"
                  />
                  {/* Pulso exterior decorativo */}
                  <motion.div 
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute -left-[35px] top-1.5 w-3 h-3 bg-gray-900 rounded-full z-0"
                  />
                  
                  <p className="text-xs text-gray-400 mb-1 tracking-widest font-medium">2024 — PRESENTE</p>
                  <p className="text-sm text-gray-500 font-light mb-1">Universidad Tecnológica</p>
                  <h4 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors">Desarrollo de Software Multiplataforma</h4>
                </motion.div>
              </div>
            </motion.section>

            {/* ─── CERTIFICATES ─── */}
            <motion.section variants={itemVariants}>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8 block">
                Certificates
              </span>
              <div className="flex flex-col gap-4">
                
                <motion.div 
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="border border-gray-200 rounded-2xl p-5 flex items-center gap-5 bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                    <span className="text-gray-900 font-serif font-bold text-xl">G</span>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-0.5">Google UX Design</h4>
                    <p className="text-xs text-gray-500 font-light">Google · 2024</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="border border-gray-200 rounded-2xl p-5 flex items-center gap-5 bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-0.5">Tu certificado aquí</h4>
                    <p className="text-xs text-gray-500 font-light">Institución · Año</p>
                  </div>
                </motion.div>

              </div>
            </motion.section>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}