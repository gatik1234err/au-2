import React, { useState } from 'react';
import { Bike } from '../../types';
import { X, Bike as BikeIcon, Plus, Trash2 } from 'lucide-react';

interface BikeModalProps {
  bike?: Bike | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (bikeData: Omit<Bike, 'id'> | Bike) => void;
}

export const BikeModal: React.FC<BikeModalProps> = ({
  bike,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    brand: bike?.brand || '',
    model: bike?.model || '',
    variant: bike?.variant || '',
    year: bike?.year || new Date().getFullYear(),
    engineCC: bike?.engineCC || 998,
    powerHP: bike?.powerHP || 180,
    fuelType: bike?.fuelType || 'Petrol',
    transmission: bike?.transmission || '6-Speed Manual',
    mileage: bike?.mileage || 5000,
    color: bike?.color || 'Racing Red',
    condition: bike?.condition || 'Excellent',
    location: bike?.location || 'Mumbai, Maharashtra',
    description: bike?.description || '',
    images: bike?.images?.length ? bike.images : ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200'],
    features: bike?.features?.length ? bike.features : ['Quickshifter', 'ABS', 'Traction Control'],
    ownershipCount: bike?.ownershipCount || 1,
    inspectionScore: bike?.inspectionScore || 95,
  });

  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bike) {
      onSave({ ...bike, ...formData });
    } else {
      onSave(formData as any);
    }
    onClose();
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
    setNewFeature('');
  };

  const removeFeature = (idx: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== idx),
    });
  };

  const addImage = () => {
    if (!newImage.trim()) return;
    setFormData({ ...formData, images: [...formData.images, newImage.trim()] });
    setNewImage('');
  };

  const removeImage = (idx: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: '720px' }}>
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)',
              }}
            >
              <BikeIcon size={20} />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg">
                {bike ? 'Edit Motorcycle Record' : 'Register New Motorcycle to Inventory'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                DestinyAuction Vehicle Database
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Main Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div>
              <label className="label">Manufacturer / Brand</label>
              <input
                className="input"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. Ducati, Yamaha"
              />
            </div>
            <div>
              <label className="label">Model Name</label>
              <input
                className="input"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. Panigale V4 S"
              />
            </div>
            <div>
              <label className="label">Variant / Edition</label>
              <input
                className="input"
                value={formData.variant}
                onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                placeholder="e.g. SP2, Anniversary"
              />
            </div>
          </div>

          {/* Engine & Year */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <div>
              <label className="label">Year</label>
              <input
                type="number"
                className="input"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="label">Engine (CC)</label>
              <input
                type="number"
                className="input"
                required
                value={formData.engineCC}
                onChange={(e) => setFormData({ ...formData, engineCC: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="label">Power (HP)</label>
              <input
                type="number"
                className="input"
                value={formData.powerHP}
                onChange={(e) => setFormData({ ...formData, powerHP: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="label">Mileage (km)</label>
              <input
                type="number"
                className="input"
                required
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Condition, Color, Location */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div>
              <label className="label">Condition Grade</label>
              <select
                className="select"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
              >
                <option value="Mint / Collector">Mint / Collector</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Restored">Restored</option>
              </select>
            </div>
            <div>
              <label className="label">Color / Livery</label>
              <input
                className="input"
                required
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Location (City, State)</label>
              <input
                className="input"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description & Provenance</label>
            <textarea
              className="textarea"
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe condition, exhaust, service records, track usage..."
            />
          </div>

          {/* Image URLs */}
          <div>
            <label className="label">Motorcycle Image Gallery URLs</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                className="input"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Paste high-res image URL (e.g. Unsplash URL)"
              />
              <button
                type="button"
                onClick={addImage}
                className="btn btn-secondary"
                style={{ flexShrink: 0 }}
              >
                <Plus size={16} /> Add Image
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '6px 0' }}>
              {formData.images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '60px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      color: '#EF4444',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {bike ? 'Save Changes' : 'Create Motorcycle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
