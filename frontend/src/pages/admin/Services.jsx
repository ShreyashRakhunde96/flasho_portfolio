import { useState, useEffect } from 'react';
import { db } from '../../utils/db';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm, useFieldArray } from 'react-hook-form';

export default function Services() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      features: [{ value: '' }]
    }
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features"
  });

  useEffect(() => {
    setServices(db.getServices());
  }, []);

  const openModal = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setValue('name', service.name);
      setValue('id', service.id);
      setValue('image', service.image || '');
      setValue('gradient', service.gradient || 'from-gray-50 to-gray-100');
      setValue('glow', service.glow || 'group-hover:bg-gray-400/20');
      setValue('features', service.features?.length ? service.features.map(f => ({ value: f })) : [{ value: '' }]);
      setImagePreview(service.image || '');
    } else {
      setEditingId(null);
      reset({
        name: '',
        id: `custom_${Date.now()}`,
        image: '',
        gradient: 'from-gray-50 to-gray-100',
        glow: 'group-hover:bg-gray-400/20',
        features: [{ value: '' }]
      });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingId(null);
    setImagePreview('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    // If it's a new service but user didn't provide image, use a placeholder
    if (!data.image) {
      data.image = 'https://placehold.co/400x400/f5c400/1a1a2e?text=' + encodeURIComponent(data.name);
    }
    
    let finalGradient = data.gradient;
    let finalGlow = data.glow;
    
    if (!editingId) {
      const palettes = [
        { gradient: 'from-blue-50 to-cyan-50', glow: 'group-hover:bg-blue-400/20' },
        { gradient: 'from-emerald-50 to-teal-50', glow: 'group-hover:bg-emerald-400/20' },
        { gradient: 'from-rose-50 to-pink-50', glow: 'group-hover:bg-rose-400/20' },
        { gradient: 'from-amber-50 to-orange-50', glow: 'group-hover:bg-amber-400/20' },
        { gradient: 'from-purple-50 to-fuchsia-50', glow: 'group-hover:bg-purple-400/20' },
        { gradient: 'from-indigo-50 to-violet-50', glow: 'group-hover:bg-indigo-400/20' },
        { gradient: 'from-cyan-50 to-sky-50', glow: 'group-hover:bg-cyan-400/20' },
        { gradient: 'from-fuchsia-50 to-pink-50', glow: 'group-hover:bg-fuchsia-400/20' },
        { gradient: 'from-lime-50 to-green-50', glow: 'group-hover:bg-lime-400/20' }
      ];
      
      const usedGradients = services.map(s => s.gradient);
      const availablePalettes = palettes.filter(p => !usedGradients.includes(p.gradient));
      
      const selectedPalette = availablePalettes.length > 0 
        ? availablePalettes[Math.floor(Math.random() * availablePalettes.length)]
        : palettes[Math.floor(Math.random() * palettes.length)];
        
      finalGradient = selectedPalette.gradient;
      finalGlow = selectedPalette.glow;
    }
    
    const formattedData = {
      ...data,
      gradient: finalGradient,
      glow: finalGlow,
      features: data.features ? data.features.map(f => f.value).filter(f => f.trim() !== '') : []
    };
    
    db.saveService(formattedData);
    setServices(db.getServices());
    toast.success(editingId ? "Service updated!" : "Service added!");
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      db.deleteService(id);
      setServices(db.getServices());
      toast.success("Service deleted");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary">Manage Services</h1>
        <button 
          onClick={() => openModal()}
          className="bg-primary hover:bg-accent text-secondary font-bold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className={`w-full h-40 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${service.gradient}`}>
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-24 h-24 object-contain drop-shadow-md"
                onError={(e) => { e.target.src = 'https://placehold.co/400x400/f5c400/1a1a2e?text=Service' }}
              />
            </div>
            
            <h3 className="text-xl font-bold text-secondary mb-1">{service.name}</h3>
            <p className="text-sm text-gray-400 mb-6">ID: {service.id}</p>
            
            <div className="mt-auto flex gap-3">
              <button 
                onClick={() => openModal(service)}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-secondary font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Edit2 size={16} /> Edit
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className="w-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Full Page Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 sm:p-12">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary">
                  {editingId ? 'Edit Service Details' : 'Create New Service'}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-full p-3 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Info Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">Service Name</label>
                    <input 
                      type="text" 
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg text-gray-900"
                      placeholder="e.g. Plumber"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">Service URL ID (for routing)</label>
                    <input 
                      type="text" 
                      {...register("id", { required: "ID is required" })}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg bg-gray-50 text-gray-900"
                      placeholder="e.g. plumber"
                    />
                  </div>
                </div>

                {/* Icon Group */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Service Icon</label>
                  <div className="flex items-center gap-6 p-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 object-contain rounded-xl border border-gray-100 bg-white shadow-sm p-2" />
                    ) : (
                      <div className="w-24 h-24 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 text-sm">No Image</div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1 px-4 py-3 outline-none file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* What is Included Group */}
                <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
                  <label className="block text-lg font-bold text-secondary mb-4">What is included?</label>
                  <div className="space-y-4">
                    {featureFields.map((field, index) => (
                      <div key={field.id} className="flex gap-3">
                        <div className="flex-1 relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{index + 1}.</span>
                          <input 
                            type="text" 
                            {...register(`features.${index}.value`)}
                            className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg text-gray-900"
                            placeholder="e.g. Deep Filter Cleaning"
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeFeature(index)}
                          className="w-14 bg-white border border-gray-200 text-red-500 flex items-center justify-center rounded-xl hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => appendFeature({ value: '' })}
                      className="mt-6 text-sm font-bold bg-white border border-gray-200 px-6 py-3 rounded-full hover:bg-primary/5 hover:border-primary/20 text-primary flex items-center gap-2 transition-all shadow-sm"
                    >
                      <Plus size={18} /> Add New Feature
                    </button>
                  </div>
                </div>

                {/* Hidden styling fields to retain data on edit */}
                <input type="hidden" {...register("gradient")} />
                <input type="hidden" {...register("glow")} />

                {/* Footer */}
                <div className="pt-8 mt-4 border-t border-gray-100 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="px-8 py-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-accent text-secondary font-bold px-12 py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/25"
                  >
                    {editingId ? 'Save All Changes' : 'Create Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
