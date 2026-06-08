import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import WhyFlasho from '../components/WhyFlasho';
import SocialImpact from '../components/SocialImpact';
import Founder from '../components/Founder';
import JoinEcosystem from '../components/JoinEcosystem';
import ContactForm from '../components/ContactForm';

import PartnerModal from '../components/PartnerModal';

export default function Home() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerType, setPartnerType] = useState('');

  const handleOpenPartner = (type) => {
    setPartnerType(type);
    setIsPartnerModalOpen(true);
  };

  return (
    <>
      <Toaster position="top-center" />
      
      <Hero />
      <Services />
      <HowItWorks />
      <WhyFlasho />
      <SocialImpact />
      <Founder />
      <JoinEcosystem 
        onOpenPartnerModal={handleOpenPartner} 
      />
      <ContactForm />
      
      <PartnerModal 
        isOpen={isPartnerModalOpen} 
        onClose={() => setIsPartnerModalOpen(false)} 
        initialType={partnerType}
      />
    </>
  );
}
