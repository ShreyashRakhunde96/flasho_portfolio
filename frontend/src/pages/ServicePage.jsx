import { useParams, useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { ArrowLeft, CheckCircle2, Star } from 'lucide-react';
import { db } from '../utils/db';
import googlePlayImage from '../assets/get-it-on-google-play.png';

export default function ServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the service data based on the URL parameter
  const service = db.getServices().find((s) => s.id === id);

  useLayoutEffect(() => {
    // Scroll to top when loading the page
    window.scrollTo(0, 0);
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



  return (
    <>
      {/* Main Page Content */}
      <div className="pt-24 pb-20 min-h-screen bg-gray-50">
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
              <a href="#" className="inline-block transition-transform hover:scale-105 active:scale-95 shadow-sm rounded-lg overflow-hidden">
                <img src={googlePlayImage} alt="Get it on Google Play" className="h-20 w-auto object-contain" />
              </a>
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

          {/* What's Included */}
          {service.features && service.features.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-secondary mb-10 text-center">What's Included</h2>
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm max-w-4xl mx-auto">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-muted">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-lg font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
