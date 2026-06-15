import { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] font-body pt-32 pb-24 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#27963C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Pass hai, Fast hai
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Story.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            We started Flasho with a simple belief: finding a trusted professional for your home shouldn't be a struggle. We're bridging the gap between exceptional service providers and the people who need them.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-32"
        >
          <motion.div variants={itemVariants} className="bg-[#111111] border border-white/10 rounded-3xl p-10 lg:p-12 hover:border-primary/30 transition-colors duration-500 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500">
               <span className="text-2xl font-bold font-display">01</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">How We Started</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              The idea for Flasho was born out of personal frustration. We noticed how difficult and time-consuming it was to find reliable tradespeople and service professionals. The process involved endless phone calls, uncertain pricing, and unreliable scheduling. We knew there had to be a better way—a system that utilized modern technology to connect customers with verified, local professionals instantly.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#111111] border border-white/10 rounded-3xl p-10 lg:p-12 hover:border-primary/30 transition-colors duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary to-transparent opacity-50"></div>
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500">
               <span className="text-2xl font-bold font-display">02</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Why We Started</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our vision goes beyond just booking a service. We want to build an inclusive platform that empowers both customers and skilled professionals. For customers, it's about peace of mind, transparent pricing, and fast service. For our partner agencies and service personnel, it's about providing a steady stream of work, fair compensation, and the technological tools they need to grow their businesses.
            </p>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Meet the Founders
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-2xl mx-auto mb-16">
            The passionate minds driving the Flasho ecosystem forward.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Vansh Kirtishahi */}
            <motion.div variants={itemVariants} className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:bg-[#151515] hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-3xl font-display font-bold text-primary mb-6 shadow-inner border border-white/10">
                VK
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Vansh Kirtishahi</h3>
              <p className="text-primary font-medium mb-6">Co-founder</p>
              <p className="text-gray-400 leading-relaxed">
                Driving the mobile experience as our App Developer, ensuring Flasho is seamless and accessible on every device.
              </p>
            </motion.div>

            {/* Yashodip Devkar */}
            <motion.div variants={itemVariants} className="bg-gradient-to-b from-primary/10 to-[#111111] border border-primary/30 rounded-3xl p-10 relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_40px_rgba(46,175,77,0.1)] flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl pointer-events-none"></div>
              
              <div className="w-28 h-28 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-4xl font-display font-bold text-primary mb-6 shadow-xl border border-primary/50 relative z-10">
                YD
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-2 relative z-10">Yashodip Devkar</h3>
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-8 relative z-10">Founder & CEO</p>
              
              <div className="relative z-10">
                <span className="text-primary text-4xl absolute -top-4 -left-4 opacity-50">"</span>
                <p className="text-white/90 italic leading-relaxed px-4 mb-4">
                  Pass hai, Fast hai is more than a tagline; it's our commitment to speed, proximity, and trust.
                </p>
                <span className="text-primary text-4xl absolute -bottom-6 -right-2 opacity-50">"</span>
              </div>
            </motion.div>

            {/* Shreyash Rakhunde */}
            <motion.div variants={itemVariants} className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:bg-[#151515] hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-3xl font-display font-bold text-primary mb-6 shadow-inner border border-white/10">
                SR
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Shreyash Rakhunde</h3>
              <p className="text-primary font-medium mb-6">Co-founder</p>
              <p className="text-gray-400 leading-relaxed">
                Leading our Social Media presence, Web Development, and Marketing strategies to connect Flasho with the community.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
