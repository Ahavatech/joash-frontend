'use client';


import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TechnologiesSection() {
  const technologies = [
    { id: '1', name: 'React', icon: '/icons/react.svg', category: 'Frontend' },
    { id: '2', name: 'Node.js', icon: '/icons/nodejs.svg', category: 'Backend' },
    { id: '3', name: 'TypeScript', icon: '/icons/typescript.svg', category: 'Language' },
    { id: '4', name: 'Python', icon: '/icons/python.svg', category: 'Language' },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Render all technologies in a single block

  return (
    <section ref={ref} className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-black to-slate-900/50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-[#5d21da] bg-clip-text text-transparent">
              Technologies & Skills
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A selection of technologies and skills I use to build, automate, and launch modern digital products.
          </p>
        </motion.div>

        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-[#5d21da]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#5d21da]/10">
                  {tech.icon ? (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#5d21da] to-[#4a1ba8] rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {tech.name.charAt(0)}
                    </div>
                  )}
                  <h4 className="font-semibold text-white group-hover:text-[#5d21da] transition-colors duration-300">
                    {tech.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#5d21da]/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}