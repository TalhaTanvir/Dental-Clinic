import { useState, useEffect } from 'react';
import { testimonialsAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { DataTable, Button, Badge, Modal, Input, Select, Textarea, ConfirmDialog } from '../components/ui';

const Testimonials = () => {
  const { success, error: showError } = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    rating: 5,
    content: '',
    image: '',
    approved: false,
    featured: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, [filter]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      let params = '';
      if (filter === 'pending') params = '?approved=false';
      else if (filter === 'approved') params = '?approved=true';
      const response = await testimonialsAPI.getAll(params);
      setTestimonials(response.data || []);
    } catch (err) {
      showError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setSelectedTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        email: testimonial.email || '',
        service: testimonial.service || '',
        rating: testimonial.rating || 5,
        content: testimonial.content,
        image: testimonial.image || '',
        approved: testimonial.approved || false,
        featured: testimonial.featured || false,
      });
    } else {
      setSelectedTestimonial(null);
      setFormData({
        name: '',
        email: '',
        service: '',
        rating: 5,
        content: '',
        image: '',
        approved: false,
        featured: false,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedTestimonial) {
        await testimonialsAPI.update(selectedTestimonial._id, formData);
        success('Testimonial updated successfully');
      } else {
        await testimonialsAPI.create(formData);
        success('Testimonial created successfully');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (testimonial) => {
    try {
      await testimonialsAPI.approve(testimonial._id);
      success('Testimonial approved successfully');
      fetchTestimonials();
    } catch (err) {
      showError(err.message);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await testimonialsAPI.delete(selectedTestimonial._id);
      success('Testimonial deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedTestimonial(null);
      fetchTestimonials();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img src={row.image} alt={value} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold">
              {value?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-slate-800">{value}</p>
            <p className="text-xs text-slate-500">{row.service || 'General'}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'content',
      label: 'Review',
      render: (value) => (
        <p className="text-slate-600 line-clamp-2 max-w-md">{value}</p>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => renderStars(value),
    },
    {
      key: 'approved',
      label: 'Status',
      render: (value, row) => (
        <div className="flex flex-col gap-1">
          <Badge variant={value ? 'success' : 'warning'}>
            {value ? 'Approved' : 'Pending'}
          </Badge>
          {row.featured && (
            <Badge variant="purple" size="sm">Featured</Badge>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {!row.approved && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApprove(row);
              }}
              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Approve"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(row);
            }}
            className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTestimonial(row);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Manage Testimonials</h2>
          <p className="text-slate-500 text-sm mt-1">Review and approve customer testimonials</p>
        </div>
        <Button onClick={() => openModal()}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Testimonial
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'approved'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === status
                ? 'bg-teal-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={testimonials}
        loading={loading}
        emptyMessage="No testimonials found"
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Customer Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              placeholder="e.g., Teeth Whitening"
            />
            <Select
              label="Rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              options={[
                { value: 5, label: '5 Stars' },
                { value: 4, label: '4 Stars' },
                { value: 3, label: '3 Stars' },
                { value: 2, label: '2 Stars' },
                { value: 1, label: '1 Star' },
              ]}
            />
          </div>
          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
          />
          <Textarea
            label="Review Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            required
          />
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="approved"
                checked={formData.approved}
                onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                className="w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500"
              />
              <label htmlFor="approved" className="text-sm text-slate-700">
                Approved
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500"
              />
              <label htmlFor="featured" className="text-sm text-slate-700">
                Featured
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {selectedTestimonial ? 'Update' : 'Create'} Testimonial
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${selectedTestimonial?.name}"?`}
        loading={submitting}
      />
    </div>
  );
};

export default Testimonials;
