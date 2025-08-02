"use client";

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LynphylPage() {
  // Initialize intersection observer for fade-in elements
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation for stats
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent || '0');
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
        } else {
          if (counter.textContent?.includes('+')) {
            counter.textContent = Math.floor(current) + '+';
          } else if (counter.textContent?.includes('%')) {
            counter.textContent = Math.floor(current * 10) / 10 + '%';
          } else if (counter.textContent?.includes('M')) {
            counter.textContent = Math.floor(current) + 'M+';
          } else {
            counter.textContent = Math.floor(current).toString();
          }
        }
      }, 20);
    });
  };

  useEffect(() => {
    if (inView) {
      animateCounters();
    }
  }, [inView]);

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <div className="bg-animation fixed inset-0 z-[-2]" />
      
      <nav id="navbar" className="fixed w-full px-12 py-5 bg-[rgba(10,10,10,0.85)] backdrop-blur-2xl border-b border-white/10 z-50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6b6b] via-[#ffd93d] to-[#6bcf7f] bg-clip-text text-transparent">
            Lynphyl
          </div>
          <ul className="hidden md:flex gap-10">
            <li><a href="#home" className="font-medium hover:text-[#ffd93d] transition-colors">Home</a></li>
            <li><a href="#services" className="font-medium hover:text-[#ffd93d] transition-colors">Services</a></li>
            <li><a href="#about" className="font-medium hover:text-[#ffd93d] transition-colors">About</a></li>
            <li><a href="#contact" className="font-medium hover:text-[#ffd93d] transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="h-screen flex items-center justify-center text-center relative overflow-hidden">
        <div className="max-w-[800px] z-10 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#ff6b6b] via-[#ffd93d] to-[#6bcf7f] bg-clip-text text-transparent">
            Powering Tomorrow&apos;s Energy
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Leading the future of oil and gas with innovative solutions, sustainable practices, and cutting-edge technology
          </p>
          <a href="#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-black font-bold text-lg rounded-full transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            Explore Partnership
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={ref} className="px-12 py-24 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] bg-clip-text text-transparent">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service cards */}
          {/* ... Add your service cards here similar to the original HTML */}
        </div>
      </section>

      {/* Continue with other sections following the same pattern */}
      {/* Stats, About, Contact sections */}
      
      <footer className="bg-black/80 py-10 px-12 text-center border-t border-white/10">
        <p>&copy; 2025 Lynphyl Oil & Gas Limited. All rights reserved. | Powering the Future of Energy</p>
      </footer>
    </div>
  );
}
