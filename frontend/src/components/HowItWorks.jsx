import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const steps = [
  { step: 1, icon: "📱", title: "Choose Your Service", desc: "Select from our wide range of home and business services." },
  { step: 2, icon: "🔍", title: "We Find the Best Match", desc: "Our algorithm pairs you with the perfect verified professional." },
  { step: 3, icon: "✅", title: "Professional Assigned", desc: "Get details of the pro assigned to your task instantly." },
  { step: 4, icon: "⭐", title: "Service Delivered", desc: "Enjoy a hassle-free service experience right at your doorstep." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            How Flasho Works
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-lg text-gray-400"
          >
            Getting your work done is as easy as 1-2-3-4.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gray-700 z-0"></div>
          
          {/* Connecting line mobile */}
          <div className="md:hidden absolute top-10 bottom-10 left-10 w-[2px] border-l-2 border-dashed border-gray-700 z-0"></div>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4">
            {steps.map((item) => (
              <motion.div 
                key={item.step}
                variants={fadeUpVariant}
                className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center group flex-1"
              >
                <div className="mr-6 md:mr-0 md:mb-6 shrink-0 relative">
                  <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center text-4xl border-2 border-gray-800 group-hover:border-primary transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-secondary font-bold rounded-full flex items-center justify-center text-sm shadow-lg">
                    {item.step}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-display font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
