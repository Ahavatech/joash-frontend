'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { api, Technology } from '@/lib/api';
import { toast } from 'sonner';

export default function TechnologiesSection() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await api.getTechnologies();
        // backend returns { success: true, technologies: [...] }
        if (Array.isArray(data)) setTechnologies(data as Technology[]);
        else if (data && Array.isArray((data as any).technologies)) setTechnologies((data as any).technologies);
        else setTechnologies([]);
      } catch (err) {
        console.error('Failed to fetch technologies', err);
        toast.error('Failed to load technologies');
        setTechnologies([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const fallback: Technology[] = [
    { id: '1', name: 'React', icon: '/icons/react.svg', category: 'Frontend' },
    { id: '2', name: 'Node.js', icon: '/icons/nodejs.svg', category: 'Backend' },
    { id: '3', name: 'TypeScript', icon: '/icons/typescript.svg', category: 'Language' },
    { id: '4', name: 'Python', icon: '/icons/python.svg', category: 'Language' },
  ];

  const list = isLoading ? [] : (technologies.length ? technologies : fallback);

  return (
    <section id="technologies" ref={ref} className="py-20 bg-black text-white relative overflow-hidden">
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

        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl mx-auto justify-items-center">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="w-44 h-44 animate-pulse bg-slate-900 border border-slate-800 rounded-xl p-6" />
                ))
              : list.map((tech, index) => (
                  <motion.div
                    key={tech.id || tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="w-44 h-44 bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-[#5d21da]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#5d21da]/10 flex flex-col items-center justify-center">
                      {tech.icon ? (
                        <img src={typeof tech.icon === 'string' ? tech.icon : (tech.icon as any).url} alt={tech.name} className="w-12 h-12 mx-auto mb-3 object-contain" />
                      ) : (
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#5d21da] to-[#4a1ba8] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {tech.name.charAt(0)}
                        </div>
                      )}
                      <h4 className="font-semibold text-white group-hover:text-[#5d21da] transition-colors duration-300">{tech.name}</h4>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#5d21da]/40 rounded-full"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 100}%` }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}