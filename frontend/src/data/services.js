import acImage from '../assets/service-ac.png';
import cleanImage from '../assets/service-clean.png';
import electricianImage from '../assets/service-electrcian.png';
import paintingImage from '../assets/service-painting.png';
import pestImage from '../assets/pest-control.png';
import carpenterImage from '../assets/services-carpenter.png';

// The list of all services available, mapped in Services.jsx
export const services = [
  { 
    id: "cleaning", 
    image: cleanImage, 
    name: "Cleaning", 
    gradient: "from-emerald-50 to-teal-50",
    glow: "group-hover:bg-emerald-400/20"
  },
  { 
    id: "ac_repair", 
    image: acImage, 
    name: "Appliance Repairing", 
    gradient: "from-blue-50 to-cyan-50",
    glow: "group-hover:bg-blue-400/20"
  },
  { 
    id: "electrician", 
    image: electricianImage, 
    name: "Electrician", 
    gradient: "from-amber-50 to-orange-50",
    glow: "group-hover:bg-amber-400/20"
  },
  { 
    id: "painting", 
    image: paintingImage, 
    name: "Painting", 
    gradient: "from-rose-50 to-pink-50",
    glow: "group-hover:bg-rose-400/20"
  },
  {
    id: "pest_control",
    image: pestImage,
    name: "Pest Control",
    gradient: "from-purple-50 to-fuchsia-50",
    glow: "group-hover:bg-purple-400/20"
  },
  {
    id: "carpenter",
    image: carpenterImage,
    name: "Carpenter",
    gradient: "from-stone-50 to-orange-50",
    glow: "group-hover:bg-orange-400/20"
  }
];
