import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center bg-secondary pt-20 overflow-hidden">
      {/* Geometric SVG Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2EAF4D" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-grow flex flex-col justify-center pt-10 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.h1 
            variants={fadeUpVariant}
            className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            Fast hai, <span className="text-primary">Pass hai.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUpVariant}
            className="text-lg md:text-xl text-gray-300 max-w-xl mb-10"
          >
            Book verified home service professionals in Kolhapur instantly. From electrical fixes to deep cleaning, we've got it all covered with transparent pricing.
          </motion.p>
          
          <motion.div 
            variants={fadeUpVariant}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-primary hover:bg-accent text-secondary font-bold text-lg px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-primary/25"
            >
              Explore Services
            </button>
            <button 
              onClick={() => scrollToSection('join')}
              className="border border-white text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-secondary transition-all"
            >
              Become a Partner
            </button>
          </motion.div>
          
          <motion.div 
            variants={fadeUpVariant}
            className="flex flex-wrap gap-6 text-sm font-medium text-gray-300"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span> Verified Pros
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span> Fast Booking
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span> Transparent Pricing
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm py-6 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-gray-300 font-medium">
          <div><span className="text-white font-bold text-xl">10+</span> Service Categories</div>
          <div className="hidden sm:block text-white/20">|</div>
          <div><span className="text-white font-bold text-xl">100+</span> Professionals</div>
          <div className="hidden sm:block text-white/20">|</div>
          <div className="text-primary font-bold">Kolhapur's #1 Platform</div>
        </div>
      </div>
    </section>
  );
}
