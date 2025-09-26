'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { api, HeroData } from '@/lib/api';
import { ArrowRight, Download } from 'lucide-react';

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'No Code Solution Expert',
    subtitle: 'Hi, I am Joash Adeoye',
    description: 'I help startups and individuals bring their ideas and product to life by building responsive  and sellable MVPs .',
    ctaText: 'View My Work',
    ctaLink: '#projects',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const data = await api.getHero();
      console.log('API getHero response:', data);
      const hero = data && data.hero;
      if (
        hero &&
        typeof hero === "object" &&
        hero.title &&
        hero.subtitle &&
        hero.description
      ) {
        setHeroData((prev) => ({
          ...prev,
          title: hero.title,
          subtitle: hero.subtitle,
          description: hero.description,
          // ctaText and ctaLink always use default
        }));
      }
      // else: keep default
    } catch (error) {
      console.error('Failed to load hero data:', error);
      setIsLoading(false); // Show default if backend is down
      return;
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-[#5d21da] border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5d21da]/20 via-black to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#5d21da]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#5d21da] font-medium mb-2"
            >
              {heroData.subtitle}
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mt-0"
            >
              <span className="bg-gradient-to-r from-white via-white to-[#5d21da] bg-clip-text text-transparent">
                {heroData.title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#5d21da] hover:bg-[#4a1ba8] text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#5d21da]/25"
              >
                <a href={heroData.ctaLink} className="flex items-center gap-2">
                  {heroData.ctaText}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#5d21da] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}