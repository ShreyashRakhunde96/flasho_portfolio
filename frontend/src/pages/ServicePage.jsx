import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Star } from 'lucide-react';
import { services } from '../data/services';
import CleaningTransition from '../components/CleaningTransition';
import AcRepairTransition from '../components/AcRepairTransition';
import ElectricianTransition from '../components/ElectricianTransition';
import PaintingTransition from '../components/PaintingTransition';
import CarpenterTransition from '../components/CarpenterTransition';
import PestControlTransition from '../components/PestControlTransition';

export default function ServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(true);

  // Find the service data based on the URL parameter
  const service = services.find((s) => s.id === id);

  const validTransitions = ['cleaning', 'ac_repair', 'electrician', 'painting', 'carpenter', 'pest_control'];

  useEffect(() => {
    // Scroll to top when loading the page
    window.scrollTo(0, 0);
    
    // Only show transitions for valid services
    if (!validTransitions.includes(id)) {
      setShowTransition(false);
    } else {
      setShowTransition(true);
    }
  }, [id]);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-display font-bold text-secondary mb-4">Service Not Found</h1>
        <button 
          onClick={() => navigate('/')}
          className="text-primary hover:underline font-medium"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Packages data structure for all services
  const allPackages = {
    cleaning: [
      {
        name: 'Basic Cleaning', price: '₹999', recommended: false,
        features: ['Dusting & Sweeping', 'Mopping', 'Bathroom Cleaning (1)', 'Kitchen Surface Cleaning'],
      },
      {
        name: 'Deep Cleaning', price: '₹2499', recommended: true,
        features: ['Everything in Basic', 'Deep Bathroom Cleaning (2)', 'Appliance Exterior Cleaning', 'Window & Balcony Cleaning', 'Sofa Vacuuming'],
      },
      {
        name: 'Move-in/Move-out', price: '₹3999', recommended: false,
        features: ['Everything in Deep', 'Inside Cabinets & Drawers', 'Wall Stain Removal', 'Heavy Grease Removal', 'Sanitization'],
      }
    ],
    ac_repair: [
      {
        name: 'AC Servicing', price: '₹499', recommended: false,
        features: ['Filter Cleaning', 'Gas Level Check', 'Cooling Coil Wash', 'Performance Test'],
      },
      {
        name: 'Deep AC Cleaning', price: '₹999', recommended: true,
        features: ['Everything in Servicing', 'Chemical Wash', 'Drainage Cleaning', 'Anti-bacterial Spray', 'Thermostat Calibration'],
      },
      {
        name: 'Installation/Uninst.', price: '₹1499', recommended: false,
        features: ['Safe Dismantling', 'Copper Pipe Fitting', 'Gas Check & Top-up (Extra)', 'Secure Wall Mount'],
      }
    ],
    electrician: [
      {
        name: 'Basic Checkup', price: '₹299', recommended: false,
        features: ['Fault Diagnosis', 'Switch/Socket Repair (up to 2)', 'MCB Trip Fix', 'Safety Inspection'],
      },
      {
        name: 'Appliance & Fitting', price: '₹799', recommended: true,
        features: ['Fan Installation', 'Tube Light/LED Fitting', 'Geyser Installation', 'Wiring Check'],
      },
      {
        name: 'Complete Rewiring', price: '₹3499', recommended: false,
        features: ['Full Room Rewiring', 'Distribution Board Setup', 'Earthing Installation', 'Concealed Wiring Repair'],
      }
    ],
    painting: [
      {
        name: 'Touch Up', price: '₹1499', recommended: false,
        features: ['Single Wall Painting', 'Patch Repair', 'Stain Removal', 'Basic Putty Work'],
      },
      {
        name: 'Room Makeover', price: '₹4999', recommended: true,
        features: ['2 Coats Premium Paint', 'Full Room Wall Putty', 'Ceiling Painting', 'Post-Painting Cleanup'],
      },
      {
        name: 'Full Home Exterior', price: '₹14999', recommended: false,
        features: ['Weatherproof Coating', 'Crack Filling', 'Anti-Fungal Treatment', 'Scaffolding Included'],
      }
    ],
    carpenter: [
      {
        name: 'Quick Repairs', price: '₹399', recommended: false,
        features: ['Door Hinge Fix', 'Lock Replacement', 'Drawer Alignment', 'Minor Wood Polish'],
      },
      {
        name: 'Furniture Assembly', price: '₹899', recommended: true,
        features: ['Bed/Wardrobe Assembly', 'TV Unit Setup', 'Bookshelf Installation', 'Sturdy Joint Check'],
      },
      {
        name: 'Custom Woodwork', price: '₹2999', recommended: false,
        features: ['Custom Shelving', 'Door Frame Repair', 'Modular Kitchen Minor Fix', 'Veneer/Laminate Pasting'],
      }
    ],
    pest_control: [
      {
        name: 'General Pest Control', price: '₹899', recommended: false,
        features: ['Cockroach Treatment', 'Ant Eradication', 'Kitchen Spraying', 'Bathroom Drain Gel'],
      },
      {
        name: 'Termite Treatment', price: '₹2499', recommended: true,
        features: ['Drill & Inject Method', 'Wood Preservation', 'Wall Base Treatment', '1-Year Guarantee'],
      },
      {
        name: 'Bed Bug Eradication', price: '₹1899', recommended: false,
        features: ['Deep Mattress Spray', 'Furniture Crevice Treatment', 'Two-Step Chemical Process', 'Post-Service Audit'],
      }
    ]
  };

  const packages = allPackages[id] || [];

  return (
    <>
      {showTransition && id === 'cleaning' && <CleaningTransition onComplete={() => setShowTransition(false)} />}
      {showTransition && id === 'ac_repair' && <AcRepairTransition onComplete={() => setShowTransition(false)} />}
      {showTransition && id === 'electrician' && <ElectricianTransition onComplete={() => setShowTransition(false)} />}
      {showTransition && id === 'painting' && <PaintingTransition onComplete={() => setShowTransition(false)} />}
      {showTransition && id === 'carpenter' && <CarpenterTransition onComplete={() => setShowTransition(false)} />}
      {showTransition && id === 'pest_control' && <PestControlTransition onComplete={() => setShowTransition(false)} />}

      {/* Main Page Content - fades in after transition */}
      <div 
        className={`pt-24 pb-20 min-h-screen bg-gray-50 transition-opacity duration-1000 ease-in-out ${
          showTransition ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate('/#services')}
            className="flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </button>

          {/* Hero Section */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} rounded-bl-full -z-0 blur-2xl opacity-50`}></div>
            
            <div className="md:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-primary rounded-full text-sm font-medium mb-6 border border-green-100">
                <Star className="w-4 h-4 fill-primary" /> 4.8 (2k+ Reviews)
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-secondary mb-6">
                Professional <br/><span className="text-primary">{service.name}</span>
              </h1>
              <p className="text-lg text-muted mb-8 leading-relaxed">
                Transform your space with our expert {service.name.toLowerCase()} services. Vetted professionals, safe chemicals, and sparkling results guaranteed.
              </p>
              <button className="bg-primary hover:bg-accent text-secondary font-bold text-lg px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-primary/25 w-full sm:w-auto">
                Book Now
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center relative z-10">
              <div className={`relative bg-gradient-to-br ${service.gradient} w-72 h-72 rounded-full flex items-center justify-center shadow-inner border border-white/60`}>
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-56 h-56 object-contain scale-[1.3] drop-shadow-2xl" 
                />
              </div>
            </div>
          </div>

          {/* Packages */}
          {packages.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-secondary mb-10 text-center">Select a Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-white rounded-3xl p-8 border-2 transition-all relative ${
                      pkg.recommended ? 'border-primary shadow-xl shadow-primary/10 scale-105 z-10' : 'border-gray-100 shadow-sm hover:border-gray-200'
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-secondary text-sm font-bold px-4 py-1 rounded-full shadow-md">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-display font-bold text-secondary mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-secondary mb-6">{pkg.price}</div>
                    
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-muted">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
                      pkg.recommended ? 'bg-secondary text-white hover:bg-gray-800' : 'bg-gray-100 text-secondary hover:bg-gray-200'
                    }`}>
                      Select
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
