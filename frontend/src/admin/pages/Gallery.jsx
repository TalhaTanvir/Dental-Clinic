import { useState, useEffect } from 'react';
import { galleryAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Button, Badge, Modal, Input, Select, Textarea, ConfirmDialog } from '../components/ui';

const categoryOptions = [
  { value: 'clinic', label: 'Clinic' },
  { value: 'team', label: 'Team' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'before-after', label: 'Before & After' },
  { value: 'events', label: 'Events' },
];

const Gallery = () => {
  const { success, error: showError } = useToast();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'clinic',
    order: 0,
    active: true,
  });

  useEffect(() => {
    fetchGallery();
  }, [filter]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? `?category=${filter}` : '';
      const response = await galleryAPI.getAll(params);
      setGallery(response.data || []);
    } catch (err) {
      showError('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        title: item.title,
        description: item.description || '',
        image: item.image,
        category: item.category || 'clinic',
        order: item.order || 0,
        active: item.active !== false,
      });
    } else {
      setSelectedItem(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        category: 'clinic',
        order: gallery.length,
        active: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedItem) {
        await galleryAPI.update(selectedItem._id, formData);
        success('Gallery item updated successfully');
      } else {
        await galleryAPI.create(formData);
        success('Gallery item added successfully');
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await galleryAPI.delete(selectedItem._id);
      success('Gallery item deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedItem(null);
      fetchGallery();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Manage Gallery</h2>
          <p className="text-slate-500 text-sm mt-1">Add and manage gallery images</p>
        </div>
        <Button onClick={() => openModal()}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Image
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          All
        </button>
        {categoryOptions.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === cat.value
                ? 'bg-teal-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : gallery.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">No gallery items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="p-2 bg-white rounded-lg text-slate-700 hover:bg-teal-500 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setDeleteDialogOpen(true);
                    }}
                    className="p-2 bg-white rounded-lg text-slate-700 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {item.active === false && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default">Inactive</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-slate-800 truncate">{item.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="primary" size="sm">{item.category}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            required
          />
          {formData.image && (
            <div className="rounded-lg overflow-hidden border border-slate-200">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
                }}
              />
            </div>
          )}
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categoryOptions}
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500"
            />
            <label htmlFor="active" className="text-sm text-slate-700">
              Item is active
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {selectedItem ? 'Update' : 'Add'} Image
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Gallery Item"
        message={`Are you sure you want to delete "${selectedItem?.title}"?`}
        loading={submitting}
      />
    </div>
  );
};

export default Gallery;
