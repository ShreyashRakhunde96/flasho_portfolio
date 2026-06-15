import { useState, useEffect } from 'react';
import { db } from '../../utils/db';
import { MessageSquare, Briefcase, Users } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    messages: 0,
    services: 0,
    partners: 0
  });

  useEffect(() => {
    const messages = db.getMessages();
    const services = db.getServices();
    
    setStats({
      messages: messages.length,
      services: services.length,
      partners: messages.filter(m => m.type === 'Partner').length
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-secondary mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Messages</p>
            <h3 className="text-3xl font-bold text-secondary">{stats.messages}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <Briefcase size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Active Services</p>
            <h3 className="text-3xl font-bold text-secondary">{stats.services}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-green-50 text-green-500 rounded-xl flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Partner Applications</p>
            <h3 className="text-3xl font-bold text-secondary">{stats.partners}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
