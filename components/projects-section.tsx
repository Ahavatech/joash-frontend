'use client';


import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI and secure payment integration.',
      image: '/placeholder-project.jpg',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
    },
    // Add more default projects here if needed
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = Array.isArray(projects) ? projects.filter(project => project.featured) : [];
  const otherProjects = Array.isArray(projects) ? projects.filter(project => !project.featured) : [];

  return (
    <section ref={ref} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #5d21da 25%, transparent 25%), linear-gradient(-45deg, #5d21da 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #5d21da 75%), linear-gradient(-45deg, transparent 75%, #5d21da 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-[#5d21da] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <div className="grid gap-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-[#5d21da]" />
                      <span className="text-[#5d21da] font-medium">Featured Project</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-[#5d21da]/30 text-[#5d21da] hover:bg-[#5d21da]/10"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Button
                          asChild
                          className="bg-[#5d21da] hover:bg-[#4a1ba8] text-white"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="border-slate-600 text-white hover:bg-slate-800"
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <motion.div
                    className={`relative group ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full aspect-video bg-gradient-to-br from-[#5d21da] to-[#4a1ba8] flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-12 text-center"
            >
              More Projects
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-[#5d21da]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#5d21da]/10">
                    <div className="relative overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#5d21da] to-[#4a1ba8] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <h4 className="text-xl font-semibold group-hover:text-[#5d21da] transition-colors duration-300">
                        {project.title}
                      </h4>
                      
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-slate-700 text-slate-300 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        {project.liveUrl && (
                          <Button
                            asChild
                            size="sm"
                            className="bg-[#5d21da] hover:bg-[#4a1ba8] text-white flex-1"
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 flex-1"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}