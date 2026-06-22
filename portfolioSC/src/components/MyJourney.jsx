import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const journeyData = [
  {
    id: 0,
    year: "2024",
    title: "Fundamentos teóricos",
    description: "Inicié mi especialización académica en Desarrollo de Software Multiplataforma, sentando las bases lógicas y prácticas para mi carrera profesional.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 1,
    year: "Feb 2026",
    title: "Mantenimiento y Firmware",
    description: "Ejecuté la recuperación manual exitosa de un chip de BIOS corrupto mediante programación a bajo nivel, utilizando un programador USB CH341A y adaptadores de voltaje.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    year: "May 2026",
    title: "Arquitectura PWA y Telemedicina",
    description: "Desarrollo y estructuración de una Progressive Web App (PWA) integrando un sistema de triaje automatizado y un módulo de telemedicina con geolocalización.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    year: "May 2026",
    title: "Refinamiento de UX/UI",
    description: "Modificación y optimización de perfiles de usuario (User Personas) en etapas de diseño, enfatizando una experiencia de usuario segura, centralizada y gamificada.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    year: "Jun 2026",
    title: "Identidad Digital",
    description: "Diseño y desarrollo de mi portafolio profesional interactivo implementando el ecosistema React, Vite y arquitecturas de animación fluidas.",
    image: "https://images.unsplash.com/photo-1481481300826-3054128bc4e5?w=800&auto=format&fit=crop&q=80",
  },
];

const dotPositions = [
  { cx: 100, cy: 60  },
  { cx: 300, cy: 30  },
  { cx: 500, cy: 90  },
  { cx: 700, cy: 30  },
  { cx: 900, cy: 60  },
];

const WAVE_PATH = "M 100,60 C 200,60 200,30 300,30 C 400,30 400,90 500,90 C 600,90 600,30 700,30 C 800,30 800,60 900,60";
const PROGRESS_BY_INDEX = [0, 0.25, 0.5, 0.75, 1.0];
const TOTAL_DASH = 100;

export default function MyJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dashOffset, setDashOffset] = useState(TOTAL_DASH);

  useEffect(() => {
    const timer = setTimeout(() => updateLine(0), 120);
    return () => clearTimeout(timer);
  }, []);

  function updateLine(index) {
    const offset = TOTAL_DASH - TOTAL_DASH * PROGRESS_BY_INDEX[index];
    setDashOffset(offset);
    setActiveIndex(index);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-200 text-center">
      <h2 className="text-3xl md:text-4xl font-serif mb-16 tracking-wide">My Journey</h2>

      {/* ── LÍNEA DEL TIEMPO ── */}
      <div className="w-full mb-16 overflow-x-auto overflow-y-hidden pb-8 custom-scrollbar">
        <div className="min-w-[1000px] mx-auto flex justify-center">
          <svg
            viewBox="0 0 1000 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[1000px] overflow-visible"
            style={{ maxHeight: 120 }}
          >
            {/* Línea de fondo */}
            <path
              d={WAVE_PATH}
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Línea de progreso animada */}
            <path
              d={WAVE_PATH}
              fill="none"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={TOTAL_DASH}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
            />

            {/* Puntos interactivos */}
            {dotPositions.map((pos, index) => (
              <g
                key={index}
                onClick={() => updateLine(index)}
                className="cursor-pointer group"
              >
                {/* Área de clic invisible */}
                <circle cx={pos.cx} cy={pos.cy} r={25} fill="transparent" />

                {/* 🔥 NUEVO: Efecto de pulsación elegante para el nodo activo */}
                {activeIndex === index && (
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    fill="none"
                    stroke="#111827"
                    strokeWidth={1}
                    initial={{ r: 8, opacity: 0.6 }}
                    animate={{ r: 24, opacity: 0 }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeOut" 
                    }}
                  />
                )}

                {/* Anillo exterior animado estático */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={8}
                  fill="none"
                  stroke="#111827"
                  strokeWidth={1.5}
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: `scale(${activeIndex === index ? 1 : 0})`,
                    transformOrigin: `${pos.cx}px ${pos.cy}px`,
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                />

                {/* Punto interior */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={4}
                  fill={activeIndex === index ? "#111827" : "#D1D5DB"}
                  className="group-hover:fill-gray-400 transition-colors duration-300"
                />

                {/* Año */}
                <text
                  x={pos.cx}
                  y={pos.cy + 30}
                  textAnchor="middle"
                  className="select-none"
                  style={{
                    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    fill: activeIndex === index ? "#111827" : "#9CA3AF",
                    fontWeight: activeIndex === index ? 600 : 400,
                    transition: "fill 0.3s, font-weight 0.3s",
                  }}
                >
                  {journeyData[index].year}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* ── CONTENIDO DINÁMICO ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="flex flex-col items-center"
        >
          <h3 className="text-2xl font-medium text-gray-900 mb-4 tracking-tight">
            {journeyData[activeIndex].title}
          </h3>

          <p className="text-gray-500 font-light leading-relaxed mb-10 max-w-2xl text-sm md:text-base">
            {journeyData[activeIndex].description}
          </p>

          <div className="overflow-hidden rounded-xl bg-gray-100 w-full max-w-3xl aspect-video shadow-sm">
            <img
              src={journeyData[activeIndex].image}
              alt={journeyData[activeIndex].title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}