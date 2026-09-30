import React, { useState } from 'react';
import { Bike } from '../../types';
import { bikeService } from '../../services/bike.service';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, ShieldCheck, Eye, Search } from 'lucide-react';

interface AdminBikesPageProps {
  onOpenCreate: () => void;
  onEditBike: (bike: Bike) => void;
}

export const AdminBikesPage: React.FC<AdminBikesPageProps> = ({
  onOpenCreate,
  onEditBike,
}) => {
  const { showToast } = useToast();
  const [bikes, setBikes] = useState<Bike[]>(bikeService.getAllBikes());
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const refreshList = () => {
    setBikes(bikeService.getAllBikes());
  };

  const handleDelete = (id: string) => {
    const success = bikeService.deleteBike(id);
    if (success) {
      showToast({
        type: 'success',
        title: 'Motorcycle Deleted',
        message: 'The vehicle has been removed from inventory.',
      });
      refreshList();
    }
    setDeleteConfirmId(null);
  };

  const filteredBikes = bikes.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.brand.toLowerCase().includes(q) ||
      b.model.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display font-bold text-white text-3xl">
            Motorcycles Inventory ({bikes.length})
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
            Manage superbike registry, specifications, condition grading, and photo dossiers.
          </p>
        </div>

        <button onClick={onOpenCreate} className="btn btn-primary">
          <Plus size={16} /> Add New Motorcycle
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '20px', maxWidth: '380px' }}>
        <input
          className="input"
          placeholder="Filter by brand, model, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Motorcycle</th>
              <th>Displacement</th>
              <th>Condition</th>
              <th>Mileage</th>
              <th>Location</th>
              <th>Inspection Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBikes.map((bike) => (
              <tr key={bike.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={bike.images[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300'}
                      alt={bike.model}
                      style={{ width: '56px', height: '38px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {bike.year} {bike.brand} {bike.model}
                      </div>
                      <div className="text-xs text-muted">
                        {bike.variant || 'Standard'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-mono text-white font-semibold">
                  {bike.engineCC} cc
                </td>
                <td>
                  <span className="badge badge-orange" style={{ fontSize: '11px' }}>
                    {bike.condition}
                  </span>
                </td>
                <td className="font-mono text-secondary">
                  {bike.mileage.toLocaleString('en-IN')} km
                </td>
                <td className="text-secondary text-sm">
                  {bike.location}
                </td>
                <td>
                  <span className="badge badge-won">
                    <ShieldCheck size={11} /> {bike.inspectionScore || 95}/100
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onEditBike(bike)}
                      className="btn btn-secondary btn-sm"
                      title="Edit specifications"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(bike.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--status-lost)' }}
                      title="Delete motorcycle"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal (PRD Section 41) */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ padding: '24px' }}>
            <h3 className="font-display font-bold text-white text-lg">
              Are you sure you want to delete this bike?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px', marginBottom: '20px' }}>
              This will remove the vehicle and its attached photo dossier from the inventory database. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--status-lost)', borderColor: 'var(--status-lost)' }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
