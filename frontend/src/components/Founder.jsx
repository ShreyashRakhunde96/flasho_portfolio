import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Founder() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-center relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-display font-bold text-primary mb-6 shadow-xl ring-4 ring-white">
              YD
            </div>
            
            <h2 className="font-display text-2xl font-bold text-secondary mb-1">
              Yashodip Devkar
            </h2>
            <p className="text-primary font-medium mb-8">Founder & CEO</p>
            
            <div className="relative">
              <span className="absolute -top-4 -left-6 text-4xl text-gray-200 font-display">"</span>
              <p className="text-lg md:text-xl text-secondary font-display italic mb-6 leading-relaxed px-4">
                We started Flasho with a simple belief: finding a trusted professional for your home shouldn't be a struggle. Fast hai, pass hai is more than a tagline; it's our commitment to speed, proximity, and trust.
              </p>
              <span className="absolute -bottom-6 -right-4 text-4xl text-gray-200 font-display">"</span>
            </div>
            
            <p className="text-muted text-sm max-w-lg mx-auto">
              Our vision is to build an inclusive platform that empowers both the customers who seek quality service and the skilled professionals who deliver it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
