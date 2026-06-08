import { motion } from 'framer-motion';
import { serviceCategories } from '../data/services';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4"
          >
            Services We Offer
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-lg text-muted"
          >
            From electrical fixes to deep cleaning — we've got it all.
          </motion.p>
        </div>

        {serviceCategories.map((categoryGroup, index) => (
          <div key={index} className={`mb-16 rounded-3xl p-6 md:p-10 ${categoryGroup.bgClass}`}>
            <h3 className="text-2xl font-display font-bold text-secondary mb-8">{categoryGroup.category}</h3>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoryGroup.services.map((service) => (
                <motion.div 
                  key={service.id}
                  variants={fadeUpVariant}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md hover:border-t-4 hover:border-t-primary transition-all duration-300 flex flex-col h-full"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="font-display font-semibold text-lg text-secondary mb-2">{service.name}</h4>
                  <p className="text-sm text-muted mb-2 flex-grow">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
