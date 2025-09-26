import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Smartphone } from 'lucide-react';

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profileImage = "data:image/png;base64,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";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const technologies = [
    { name: 'React', icon: Code },
    { name: 'TypeScript', icon: Code },
    { name: 'Node.js', icon: Database },
    { name: 'Python', icon: Code },
    { name: 'MongoDB', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Next.js', icon: Globe },
    { name: 'React Native', icon: Smartphone },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      image: profileImage,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: profileImage,
      technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful data visualizations.',
      image: profileImage,
      technologies: ['React', 'Chart.js', 'Weather API', 'Tailwind CSS'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white " >
              JoashAdeoye
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Technologies', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Joash Adeoye
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Full Stack Developer & Software Engineer
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl">
              I create modern, responsive web applications and mobile solutions that deliver exceptional user experiences. 
              Passionate about clean code, innovative design, and solving complex problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg"
              >
                View My Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full text-lg"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl">
                <img 
                  src={profileImage} 
                  alt="Joash Adeoye" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Passionate Developer</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With over 5 years of experience in software development, I specialize in creating 
                scalable web applications and mobile solutions. My journey began with a curiosity 
                for technology and has evolved into a passion for crafting digital experiences 
                that make a difference.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the 
                latest technologies and best practices. When I'm not coding, you can find me 
                contributing to open-source projects or mentoring aspiring developers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-blue-600 text-white px-4 py-2">Problem Solver</Badge>
                <Badge className="bg-purple-600 text-white px-4 py-2">Team Player</Badge>
                <Badge className="bg-green-600 text-white px-4 py-2">Continuous Learner</Badge>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Education</h4>
                <p className="text-gray-300">Bachelor's in Computer Science</p>
                <p className="text-gray-400">University of Technology</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Experience</h4>
                <p className="text-gray-300">5+ Years in Software Development</p>
                <p className="text-gray-400">Full Stack & Mobile Development</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              I work with modern technologies to build robust and scalable applications
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <tech.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-blue-600/20 text-blue-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-gray-900">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-gray-900">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects. 
              Let's connect and create something amazing together!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-8"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Mail className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-gray-300">joashadeoye@gmail.com</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Linkedin className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-300">linkedin.com/in/joash01</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Github className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">GitHub</h3>
                <p className="text-gray-300">github.com/createdbyjoash</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Joash Adeoye. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}