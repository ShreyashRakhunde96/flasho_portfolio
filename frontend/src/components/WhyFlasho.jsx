import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

import iconVerified from '../assets/Verified-Professionals.svg';
import iconFast from '../assets/Fast-Service-Allocation.svg';
import iconTransparent from '../assets/Transparent-Pricing.svg';
import iconTrusted from '../assets/Trusted-platform.svg';
import iconTech from '../assets/Tech-Driven-Operations.svg';
import iconSupport from '../assets/Reliable-Customer-Support.svg';

const features = [
  { icon: iconVerified, title: "Verified Professionals", desc: "Every service partner undergoes strict background checks and skill verification." },
  { icon: iconFast, title: "Fast Service Allocation", desc: "Our smart system matches you with the nearest available professional in minutes." },
  { icon: iconTransparent, title: "Transparent Pricing", desc: "No hidden charges. You know exactly what you'll pay before the work starts." },
  { icon: iconTrusted, title: "Trusted Platform", desc: "Your safety is our priority. We guarantee the quality of work delivered." },
  { icon: iconTech, title: "Tech-Driven Operations", desc: "A seamless app experience to track, manage, and pay for your services easily." },
  { icon: iconSupport, title: "Reliable Customer Support", desc: "Our dedicated team is always ready to assist you before, during, and after service." },
];

export default function WhyFlasho() {
  return (
    <section id="why-flasho" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4"
          >
            Why Choose Flasho?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-lg text-muted"
          >
            We are redefining home services in Kolhapur with trust, speed, and quality.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative group pt-8 pb-8 px-8"
            >
              {/* Top green accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-2xl"></div>

              <div className="w-24 h-24 bg-green-50/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 object-contain drop-shadow-sm" />
              </div>

              <h3 className="text-xl font-display font-bold text-secondary mb-3">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
